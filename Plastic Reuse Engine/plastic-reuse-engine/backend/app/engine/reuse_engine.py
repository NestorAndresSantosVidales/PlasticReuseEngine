"""
Deterministic Reuse Engine.

This is the core of the Plastic Reuse Engine. All scoring is rule-based,
explainable, and traceable to explicit material properties and input parameters.
No machine learning or probabilistic inference is used here.
"""

from typing import List, Tuple

from app.core.config import (
    CONTAMINATION_PENALTIES,
    DISCLAIMER,
    REUSE_COMPATIBILITY,
    VERDICT_THRESHOLDS,
    WASHABILITY_MODIFIERS,
)
from app.engine.plastic_rules import get_material_profile
from app.models.request_models import AnalysisRequest
from app.models.response_models import AnalysisResponse, RequestSummary, Verdict


def _determine_verdict(score: int) -> Verdict:
    """Map a numeric score to a verdict category."""
    for verdict, (low, high) in VERDICT_THRESHOLDS.items():
        if low <= score <= high:
            return Verdict(verdict)
    return Verdict.REJECTED


def _get_reuse_modifier(intended_reuse: str, suitability: str) -> int:
    """
    Return the score modifier for a given intended reuse and material suitability level.
    Defaults to the 'unknown' modifier if suitability is not mapped.
    """
    reuse_map = REUSE_COMPATIBILITY.get(intended_reuse, {})
    return reuse_map.get(suitability, reuse_map.get("unknown", -10))


def _build_reasons(
    plastic_type: str,
    profile: dict,
    contamination_level: str,
    washable: str,
    intended_reuse: str,
    contamination_penalty: int,
    washability_modifier: int,
    reuse_modifier: int,
) -> List[str]:
    """Generate human-readable reasons explaining the score."""
    reasons = []

    # Material base score reason
    base = profile["structural_score_base"]
    suitability = profile.get(f"{intended_reuse}_suitability", "unknown")
    reasons.append(
        f"{plastic_type} has a base structural score of {base}/100 "
        f"({profile['full_name']})."
    )

    # Contamination reason
    if contamination_penalty < 0:
        reasons.append(
            f"{contamination_level.capitalize()} contamination applies a "
            f"{contamination_penalty} point penalty to reuse viability."
        )
    else:
        reasons.append("No contamination detected — no penalty applied.")

    # Washability reason
    if washability_modifier > 0:
        reasons.append(
            f"Item is washable, adding +{washability_modifier} points to reuse readiness."
        )
    elif washable == "no" and contamination_level in ("medium", "high"):
        reasons.append(
            "Item cannot be washed and has significant contamination, "
            "reducing reuse viability."
        )
    elif washable == "unknown":
        reasons.append("Washability is unknown — no bonus applied.")

    # Intended reuse compatibility reason
    suitability_label = profile.get(f"{intended_reuse}_suitability", "unknown")
    if reuse_modifier > 0:
        reasons.append(
            f"{plastic_type} has '{suitability_label}' suitability for "
            f"'{intended_reuse}', adding +{reuse_modifier} points."
        )
    elif reuse_modifier < 0:
        reasons.append(
            f"{plastic_type} has '{suitability_label}' suitability for "
            f"'{intended_reuse}', applying a {reuse_modifier} point penalty."
        )
    else:
        reasons.append(
            f"{plastic_type} has '{suitability_label}' suitability for "
            f"'{intended_reuse}' — no modifier applied."
        )

    return reasons


def _build_warnings(
    plastic_type: str,
    profile: dict,
    contamination_level: str,
    washable: str,
    intended_reuse: str,
) -> List[str]:
    """Collect all applicable warnings for the analysis result."""
    warnings = list(profile.get("warnings", []))

    # Universal safety warnings
    warnings.append("Not suitable for food-contact use without specialized validation.")
    warnings.append(
        "Not recommended for child safety-critical applications without expert review."
    )

    # Contamination-specific warnings
    if contamination_level == "high":
        warnings.append(
            "High contamination significantly reduces reuse viability and "
            "increases processing risk."
        )
    if contamination_level in ("medium", "high") and washable == "no":
        warnings.append(
            "Item cannot be washed and has notable contamination — "
            "reuse is not recommended without decontamination."
        )

    # Unknown type warnings
    if plastic_type == "UNKNOWN":
        warnings.append(
            "Unknown polymer composition increases uncertainty across all assessments."
        )

    # Structural use warnings
    if intended_reuse == "modular_block":
        warnings.append(
            "Modular block use requires tighter dimensional and mechanical reliability "
            "than this engine can verify."
        )

    # Filament warnings
    if intended_reuse == "filament_candidate":
        warnings.append(
            "Filament production requires precise material characterization — "
            "do not attempt without proper equipment and testing."
        )

    # Deduplicate while preserving order
    seen = set()
    unique_warnings = []
    for w in warnings:
        if w not in seen:
            seen.add(w)
            unique_warnings.append(w)

    return unique_warnings


def _build_suggested_process(
    profile: dict,
    contamination_level: str,
    washable: str,
    intended_reuse: str,
    score: int,
) -> List[str]:
    """Build a suggested processing sequence based on material and inputs."""
    process = list(profile.get("allowed_processes", ["sorting"]))

    # Ensure washing is included if washable and contaminated
    if washable == "yes" and contamination_level in ("low", "medium", "high"):
        if "washing" not in process:
            process.insert(1, "washing")

    # Add blending suggestion for low scores
    if score < 50:
        process.append("consider_blending_with_better_characterized_material")

    # Add prototype-only note for very low scores
    if score < 30:
        process = ["sorting", "prototype_only_use"]

    return process


def run_analysis(request: AnalysisRequest, image_received: bool = False) -> AnalysisResponse:
    """
    Execute the deterministic reuse analysis.

    Scoring pipeline:
    1. Load material profile for the given plastic type
    2. Start from base structural score
    3. Apply contamination penalty
    4. Apply washability modifier
    5. Apply intended reuse compatibility modifier
    6. Clamp score to [0, 100]
    7. Determine verdict from score thresholds
    8. Build reasons, warnings, and suggested process
    9. Return structured AnalysisResponse
    """
    plastic_type = request.plastic_type.value
    contamination_level = request.contamination_level.value
    washable = request.washable.value
    intended_reuse = request.intended_reuse.value

    profile = get_material_profile(plastic_type)

    # --- Scoring ---
    score = profile["structural_score_base"]

    contamination_penalty = CONTAMINATION_PENALTIES.get(contamination_level, 0)
    score += contamination_penalty

    washability_modifier = WASHABILITY_MODIFIERS.get(washable, 0)
    # Extra penalty: not washable + medium/high contamination
    if washable == "no" and contamination_level in ("medium", "high"):
        washability_modifier = -10
    score += washability_modifier

    suitability_key = f"{intended_reuse}_suitability"
    suitability = profile.get(suitability_key, "unknown")
    reuse_modifier = _get_reuse_modifier(intended_reuse, suitability)
    score += reuse_modifier

    # Clamp
    score = max(0, min(100, score))

    verdict = _determine_verdict(score)

    reasons = _build_reasons(
        plastic_type, profile, contamination_level, washable,
        intended_reuse, contamination_penalty, washability_modifier, reuse_modifier,
    )
    warnings = _build_warnings(
        plastic_type, profile, contamination_level, washable, intended_reuse
    )
    suggested_process = _build_suggested_process(
        profile, contamination_level, washable, intended_reuse, score
    )

    # Recommended use: prefer the intended reuse if score is acceptable,
    # otherwise fall back to the material's default
    if score >= 25:
        recommended_use = intended_reuse
    else:
        recommended_use = profile.get("default_recommended_use", "experimental_prototype")

    return AnalysisResponse(
        request_summary=RequestSummary(
            plastic_type=plastic_type,
            source_type=request.source_type,
            contamination_level=contamination_level,
            washable=washable,
            intended_reuse=intended_reuse,
            notes=request.notes,
            image_received=image_received,
        ),
        reuse_score=score,
        verdict=verdict,
        recommended_use=recommended_use,
        confidence="deterministic",
        reasons=reasons,
        warnings=warnings,
        suggested_process=suggested_process,
        disclaimer=DISCLAIMER,
        future_cv_ready=True,
    )
