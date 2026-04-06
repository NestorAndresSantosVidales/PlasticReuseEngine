"""
Plastic material rules loader.
Loads and provides access to the plastic knowledge base from plastics_seed.json.
"""

import json
import os
from typing import Dict, Any

from app.core.config import PLASTICS_SEED_PATH


def load_plastic_rules() -> Dict[str, Any]:
    """Load plastic material profiles from the seed data file."""
    with open(PLASTICS_SEED_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data["plastics"]


# Module-level cache — loaded once at import time
PLASTIC_RULES: Dict[str, Any] = load_plastic_rules()


def get_material_profile(plastic_type: str) -> Dict[str, Any]:
    """
    Return the material profile for a given plastic type.
    Falls back to UNKNOWN if the type is not found.
    """
    return PLASTIC_RULES.get(plastic_type, PLASTIC_RULES["UNKNOWN"])
