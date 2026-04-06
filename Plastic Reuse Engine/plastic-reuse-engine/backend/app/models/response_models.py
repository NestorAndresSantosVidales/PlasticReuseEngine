"""
Pydantic response models for the analysis API.
"""

from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field


class Verdict(str, Enum):
    REJECTED = "REJECTED"
    LIMITED_REUSE = "LIMITED_REUSE"
    CONDITIONAL_REUSE = "CONDITIONAL_REUSE"
    GOOD_CANDIDATE = "GOOD_CANDIDATE"


class RequestSummary(BaseModel):
    plastic_type: str
    source_type: str
    contamination_level: str
    washable: str
    intended_reuse: str
    notes: Optional[str] = None
    image_received: bool = False


class AnalysisResponse(BaseModel):
    request_summary: RequestSummary
    reuse_score: int = Field(..., ge=0, le=100, description="Deterministic reuse score 0–100")
    verdict: Verdict
    recommended_use: str
    confidence: str = Field(
        ..., description="Confidence label — always 'deterministic' for rule-based engine"
    )
    reasons: List[str]
    warnings: List[str]
    suggested_process: List[str]
    disclaimer: str
    future_cv_ready: bool = True

    model_config = {
        "json_schema_extra": {
            "example": {
                "request_summary": {
                    "plastic_type": "HDPE",
                    "source_type": "detergent bottle",
                    "contamination_level": "low",
                    "washable": "yes",
                    "intended_reuse": "modular_block",
                    "notes": None,
                    "image_received": False,
                },
                "reuse_score": 82,
                "verdict": "GOOD_CANDIDATE",
                "recommended_use": "modular_block",
                "confidence": "deterministic",
                "reasons": [
                    "HDPE has relatively good suitability for low-risk remolding",
                    "Low contamination has minimal impact on reuse viability",
                    "Item is washable, improving reuse readiness",
                ],
                "warnings": [
                    "Not suitable for food-contact use without specialized validation",
                    "Structural reliability not guaranteed for load-bearing applications",
                ],
                "suggested_process": ["sorting", "washing", "shredding", "low_risk_remolding"],
                "disclaimer": "This tool provides an educational and engineering-oriented reuse recommendation...",
                "future_cv_ready": True,
            }
        }
    }


class HealthResponse(BaseModel):
    status: str
    version: str
    service: str


class MaterialProfile(BaseModel):
    plastic_type: str
    full_name: str
    structural_score_base: int
    heat_resistance: str
    contamination_sensitivity: str
    washability_bonus_possible: bool
    modular_block_suitability: str
    decorative_suitability: str
    filament_suitability: str
    default_recommended_use: str
    warnings: List[str]
    allowed_processes: List[str]
    notes: str


class MaterialsResponse(BaseModel):
    materials: List[MaterialProfile]
