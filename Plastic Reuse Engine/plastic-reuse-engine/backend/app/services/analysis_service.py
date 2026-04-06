"""
Analysis service — orchestrates image handling and engine execution.
"""

from typing import Optional

from fastapi import UploadFile

from app.engine.reuse_engine import run_analysis
from app.models.request_models import AnalysisRequest
from app.models.response_models import AnalysisResponse
from app.services.image_service import classify_image, save_image


async def perform_analysis(
    request: AnalysisRequest,
    image: Optional[UploadFile] = None,
) -> AnalysisResponse:
    """
    Orchestrate the full analysis pipeline:
    1. Optionally save and inspect the uploaded image
    2. (Future) Use CV classification to suggest plastic type
    3. Run the deterministic reuse engine
    4. Return structured response
    """
    image_received = False

    if image and image.filename:
        file_id, image_path = await save_image(image)
        image_received = True

        # Future hook: if CV returns a type and user selected UNKNOWN, override
        # cv_type = classify_image(image_path)
        # if cv_type and request.plastic_type.value == "UNKNOWN":
        #     request = request.model_copy(update={"plastic_type": cv_type})

    return run_analysis(request, image_received=image_received)
