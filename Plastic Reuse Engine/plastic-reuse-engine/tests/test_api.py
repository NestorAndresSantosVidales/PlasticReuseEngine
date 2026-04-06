"""
API integration tests for the Plastic Reuse Engine.

Run with: pytest tests/ -v
Requires: pip install httpx
"""

import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestHealthEndpoint:
    def test_health_returns_ok(self):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert "version" in data
        assert "service" in data

    def test_root_returns_service_info(self):
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "service" in data
        assert "docs" in data


class TestAnalyzeEndpoint:
    def _post_analyze(self, **kwargs):
        defaults = {
            "plastic_type": "HDPE",
            "source_type": "bottle",
            "contamination_level": "low",
            "washable": "yes",
            "intended_reuse": "modular_block",
        }
        defaults.update(kwargs)
        return client.post("/analyze", data=defaults)

    def test_analyze_returns_200(self):
        response = self._post_analyze()
        assert response.status_code == 200

    def test_analyze_response_shape(self):
        response = self._post_analyze()
        data = response.json()
        assert "reuse_score" in data
        assert "verdict" in data
        assert "recommended_use" in data
        assert "confidence" in data
        assert "reasons" in data
        assert "warnings" in data
        assert "suggested_process" in data
        assert "disclaimer" in data
        assert "future_cv_ready" in data
        assert "request_summary" in data

    def test_analyze_confidence_is_deterministic(self):
        response = self._post_analyze()
        assert response.json()["confidence"] == "deterministic"

    def test_analyze_future_cv_ready_true(self):
        response = self._post_analyze()
        assert response.json()["future_cv_ready"] is True

    def test_analyze_score_in_range(self):
        response = self._post_analyze()
        score = response.json()["reuse_score"]
        assert 0 <= score <= 100

    def test_analyze_hdpe_good_candidate(self):
        response = self._post_analyze(
            plastic_type="HDPE",
            contamination_level="none",
            washable="yes",
            intended_reuse="modular_block",
        )
        data = response.json()
        assert data["verdict"] == "GOOD_CANDIDATE"

    def test_analyze_pvc_rejected(self):
        response = self._post_analyze(
            plastic_type="PVC",
            contamination_level="medium",
            washable="no",
            intended_reuse="modular_block",
        )
        data = response.json()
        assert data["verdict"] == "REJECTED"

    def test_analyze_disclaimer_present(self):
        response = self._post_analyze()
        disclaimer = response.json()["disclaimer"]
        assert len(disclaimer) > 50

    def test_analyze_invalid_plastic_type_returns_422(self):
        response = self._post_analyze(plastic_type="UNOBTANIUM")
        assert response.status_code == 422

    def test_analyze_invalid_contamination_returns_422(self):
        response = self._post_analyze(contamination_level="extreme")
        assert response.status_code == 422

    def test_analyze_with_notes(self):
        response = self._post_analyze(notes="Slightly scratched surface")
        assert response.status_code == 200
        assert response.json()["request_summary"]["notes"] == "Slightly scratched surface"


class TestMaterialsEndpoint:
    def test_materials_returns_200(self):
        response = client.get("/materials")
        assert response.status_code == 200

    def test_materials_contains_all_types(self):
        response = client.get("/materials")
        types = [m["plastic_type"] for m in response.json()["materials"]]
        for expected in ["PET", "HDPE", "PVC", "LDPE", "PP", "PS", "OTHER", "UNKNOWN"]:
            assert expected in types

    def test_materials_profile_has_required_fields(self):
        response = client.get("/materials")
        profile = response.json()["materials"][0]
        for field in [
            "plastic_type", "full_name", "structural_score_base",
            "heat_resistance", "warnings", "allowed_processes",
        ]:
            assert field in profile
