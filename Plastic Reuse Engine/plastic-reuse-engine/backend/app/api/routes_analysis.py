"""
API routes for the Plastic Reuse Engine.
"""

import json
from typing import Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse

from app.core.config import APP_NAME, APP_VERSION
from app.engine.plastic_rules import PLASTIC_RULES
from app.models.request_models import (
    AnalysisRequest,
    ContaminationLevel,
    IntendedReuse,
    PlasticType,
    WashableOption,
)
from app.models.response_models import (
    AnalysisResponse,
    HealthResponse,
    MaterialProfile,
    MaterialsResponse,
)
from app.services.analysis_service import perform_analysis

router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["System"])
async def health_check():
    """Returns service health status."""
    return HealthResponse(status="ok", version=APP_VERSION, service=APP_NAME)


@router.post("/analyze", response_model=AnalysisResponse, tags=["Analysis"])
async def analyze(
    plastic_type: PlasticType = Form(...),
    source_type: str = Form(default="unknown"),
    contamination_level: ContaminationLevel = Form(...),
    washable: WashableOption = Form(...),
    intended_reuse: IntendedReuse = Form(...),
    notes: Optional[str] = Form(default=None),
    image: Optional[UploadFile] = File(default=None),
):
    """
    Run a deterministic reuse analysis on a plastic item.

    Accepts multipart/form-data with an optional image upload.
    Returns a structured reuse assessment with score, verdict, reasons, and warnings.
    """
    request = AnalysisRequest(
        plastic_type=plastic_type,
        source_type=source_type,
        contamination_level=contamination_level,
        washable=washable,
        intended_reuse=intended_reuse,
        notes=notes,
    )

    result = await perform_analysis(request, image=image)
    return result


@router.get("/materials", response_model=MaterialsResponse, tags=["Reference"])
async def get_materials():
    """
    Returns the full list of known plastic types and their material profiles.
    Useful for populating frontend dropdowns and displaying material cards.
    """
    profiles = []
    for ptype, data in PLASTIC_RULES.items():
        profiles.append(
            MaterialProfile(
                plastic_type=ptype,
                full_name=data["full_name"],
                structural_score_base=data["structural_score_base"],
                heat_resistance=data["heat_resistance"],
                contamination_sensitivity=data["contamination_sensitivity"],
                washability_bonus_possible=data["washability_bonus_possible"],
                modular_block_suitability=data["modular_block_suitability"],
                decorative_suitability=data["decorative_suitability"],
                filament_suitability=data["filament_suitability"],
                default_recommended_use=data["default_recommended_use"],
                warnings=data["warnings"],
                allowed_processes=data["allowed_processes"],
                notes=data["notes"],
            )
        )
    return MaterialsResponse(materials=profiles)
