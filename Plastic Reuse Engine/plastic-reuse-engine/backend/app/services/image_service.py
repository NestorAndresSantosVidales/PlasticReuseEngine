"""
Image service — handles upload, storage, and metadata extraction.

For MVP, this service accepts and stores the image temporarily.
The architecture is designed to support future CV classification integration:
- plug in a classifier in `classify_image()` without changing the API layer
- the `future_cv_ready` flag in responses signals this capability
"""

import os
import uuid
from typing import Optional, Tuple

from fastapi import UploadFile

from app.core.config import UPLOAD_DIR


async def save_image(file: UploadFile) -> Tuple[str, str]:
    """
    Save an uploaded image to the temporary upload directory.
    Returns (file_id, saved_path).
    """
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    ext = os.path.splitext(file.filename or "upload")[1] or ".jpg"
    file_id = str(uuid.uuid4())
    filename = f"{file_id}{ext}"
    save_path = os.path.join(UPLOAD_DIR, filename)

    contents = await file.read()
    with open(save_path, "wb") as f:
        f.write(contents)

    return file_id, save_path


def classify_image(image_path: str) -> Optional[str]:
    """
    Placeholder for future computer vision classification.

    In a future version, this function will:
    - Load a trained image classifier (e.g., MobileNet fine-tuned on plastic types)
    - Return a probable plastic type string (e.g., "HDPE", "PET")
    - Provide a confidence score

    For MVP, returns None to indicate no CV inference is available.
    The caller should use the user-provided plastic_type instead.
    """
    # TODO: Integrate CV model here (v2 milestone)
    return None


def get_image_metadata(image_path: str) -> dict:
    """Return basic file metadata for a saved image."""
    if not os.path.exists(image_path):
        return {}
    stat = os.stat(image_path)
    return {
        "path": image_path,
        "size_bytes": stat.st_size,
        "cv_classification": None,
        "cv_ready": True,
    }
