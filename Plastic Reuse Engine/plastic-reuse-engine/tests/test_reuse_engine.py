"""
Tests for the deterministic reuse engine.

Run with: pytest tests/ -v
"""

import sys
import os

# Ensure backend is on the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

import pytest
from app.engine.reuse_engine import run_analysis, _determine_verdict
from app.models.request_models import (
    AnalysisRequest,
    ContaminationLevel,
    IntendedReuse,
    PlasticType,
    WashableOption,
)
from app.models.response_models import Verdict


def make_request(**kwargs) -> AnalysisRequest:
    defaults = {
        "plastic_type": PlasticType.HDPE,
        "source_type": "bottle",
        "contamination_level": ContaminationLevel.none,
        "washable": WashableOption.yes,
        "intended_reuse": IntendedReuse.modular_block,
        "notes": None,
    }
    defaults.update(kwargs)
    return AnalysisRequest(**defaults)


# --- Verdict threshold tests ---

class TestVerdictThresholds:
    def test_rejected_at_zero(self):
        assert _determine_verdict(0) == Verdict.REJECTED

    def test_rejected_at_24(self):
        assert _determine_verdict(24) == Verdict.REJECTED

    def test_limited_reuse_at_25(self):
        assert _determine_verdict(25) == Verdict.LIMITED_REUSE

    def test_limited_reuse_at_49(self):
        assert _determine_verdict(49) == Verdict.LIMITED_REUSE

    def test_conditional_reuse_at_50(self):
        assert _determine_verdict(50) == Verdict.CONDITIONAL_REUSE

    def test_conditional_reuse_at_74(self):
        assert _determine_verdict(74) == Verdict.CONDITIONAL_REUSE

    def test_good_candidate_at_75(self):
        assert _determine_verdict(75) == Verdict.GOOD_CANDIDATE

    def test_good_candidate_at_100(self):
        assert _determine_verdict(100) == Verdict.GOOD_CANDIDATE


# --- Core scenario tests ---

class TestCoreScenarios:
    def test_hdpe_low_contamination_washable_modular_block(self):
        """HDPE + low contamination + washable + modular_block => GOOD_CANDIDATE"""
        req = make_request(
            plastic_type=PlasticType.HDPE,
            contamination_level=ContaminationLevel.low,
            washable=WashableOption.yes,
            intended_reuse=IntendedReuse.modular_block,
        )
        result = run_analysis(req)
        assert result.verdict == Verdict.GOOD_CANDIDATE
        assert result.reuse_score >= 75

    def test_pvc_medium_contamination_modular_block_rejected(self):
        """PVC + medium contamination + modular_block => REJECTED or very low"""
        req = make_request(
            plastic_type=PlasticType.PVC,
            contamination_level=ContaminationLevel.medium,
            washable=WashableOption.no,
            intended_reuse=IntendedReuse.modular_block,
        )
        result = run_analysis(req)
        assert result.verdict == Verdict.REJECTED
        assert result.reuse_score <= 24

    def test_pet_high_contamination_decorative_limited(self):
        """PET + high contamination + decorative_piece => LIMITED_REUSE"""
        req = make_request(
            plastic_type=PlasticType.PET,
            contamination_level=ContaminationLevel.high,
            washable=WashableOption.no,
            intended_reuse=IntendedReuse.decorative_piece,
        )
        result = run_analysis(req)
        assert result.verdict in (Verdict.REJECTED, Verdict.LIMITED_REUSE)
        assert result.reuse_score <= 49

    def test_unknown_unknown_washability_modular_block_conservative(self):
        """UNKNOWN + unknown washability + modular_block => conservative (REJECTED or LIMITED)"""
        req = make_request(
            plastic_type=PlasticType.UNKNOWN,
            contamination_level=ContaminationLevel.none,
            washable=WashableOption.unknown,
            intended_reuse=IntendedReuse.modular_block,
        )
        result = run_analysis(req)
        assert result.verdict in (Verdict.REJECTED, Verdict.LIMITED_REUSE)
        assert result.reuse_score <= 49

    def test_pp_no_contamination_washable_modular_block(self):
        """PP + no contamination + washable + modular_block => CONDITIONAL or GOOD"""
        req = make_request(
            plastic_type=PlasticType.PP,
            contamination_level=ContaminationLevel.none,
            washable=WashableOption.yes,
            intended_reuse=IntendedReuse.modular_block,
        )
        result = run_analysis(req)
        assert result.verdict in (Verdict.CONDITIONAL_REUSE, Verdict.GOOD_CANDIDATE)
        assert result.reuse_score >= 50

    def test_ps_brittle_modular_block_rejected(self):
        """PS + any contamination + modular_block => REJECTED"""
        req = make_request(
            plastic_type=PlasticType.PS,
            contamination_level=ContaminationLevel.low,
            washable=WashableOption.no,
            intended_reuse=IntendedReuse.modular_block,
        )
        result = run_analysis(req)
        assert result.verdict == Verdict.REJECTED


# --- Score clamping tests ---

class TestScoreClamping:
    def test_score_never_below_zero(self):
        req = make_request(
            plastic_type=PlasticType.UNKNOWN,
            contamination_level=ContaminationLevel.high,
            washable=WashableOption.no,
            intended_reuse=IntendedReuse.modular_block,
        )
        result = run_analysis(req)
        assert result.reuse_score >= 0

    def test_score_never_above_100(self):
        req = make_request(
            plastic_type=PlasticType.HDPE,
            contamination_level=ContaminationLevel.none,
            washable=WashableOption.yes,
            intended_reuse=IntendedReuse.decorative_piece,
        )
        result = run_analysis(req)
        assert result.reuse_score <= 100


# --- Response structure tests ---

class TestResponseStructure:
    def test_response_has_required_fields(self):
        req = make_request()
        result = run_analysis(req)
        assert result.reuse_score is not None
        assert result.verdict is not None
        assert result.recommended_use is not None
        assert result.confidence == "deterministic"
        assert isinstance(result.reasons, list)
        assert isinstance(result.warnings, list)
        assert isinstance(result.suggested_process, list)
        assert result.disclaimer != ""
        assert result.future_cv_ready is True

    def test_reasons_are_non_empty(self):
        req = make_request()
        result = run_analysis(req)
        assert len(result.reasons) > 0

    def test_warnings_always_present(self):
        """Every result should include at least the universal safety warnings."""
        req = make_request()
        result = run_analysis(req)
        assert len(result.warnings) >= 2

    def test_image_received_flag(self):
        req = make_request()
        result = run_analysis(req, image_received=True)
        assert result.request_summary.image_received is True

    def test_image_not_received_by_default(self):
        req = make_request()
        result = run_analysis(req)
        assert result.request_summary.image_received is False


# --- Washability interaction tests ---

class TestWashabilityInteraction:
    def test_washable_yes_improves_score_vs_unknown(self):
        base = make_request(washable=WashableOption.unknown, contamination_level=ContaminationLevel.low)
        washable = make_request(washable=WashableOption.yes, contamination_level=ContaminationLevel.low)
        assert run_analysis(washable).reuse_score >= run_analysis(base).reuse_score

    def test_not_washable_with_high_contamination_penalized(self):
        washable = make_request(
            washable=WashableOption.yes,
            contamination_level=ContaminationLevel.high,
        )
        not_washable = make_request(
            washable=WashableOption.no,
            contamination_level=ContaminationLevel.high,
        )
        assert run_analysis(washable).reuse_score > run_analysis(not_washable).reuse_score
