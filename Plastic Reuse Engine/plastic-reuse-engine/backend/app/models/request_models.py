"""
Pydantic request models for the analysis API.
"""

from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class PlasticType(str, Enum):
    PET = "PET"
    HDPE = "HDPE"
    PVC = "PVC"
    LDPE = "LDPE"
    PP = "PP"
    PS = "PS"
    OTHER = "OTHER"
    UNKNOWN = "UNKNOWN"


class ContaminationLevel(str, Enum):
    none = "none"
    low = "low"
    medium = "medium"
    high = "high"


class WashableOption(str, Enum):
    yes = "yes"
    no = "no"
    unknown = "unknown"


class IntendedReuse(str, Enum):
    modular_block = "modular_block"
    decorative_piece = "decorative_piece"
    non_structural_panel = "non_structural_panel"
    filament_candidate = "filament_candidate"
    experimental_prototype = "experimental_prototype"


class AnalysisRequest(BaseModel):
    plastic_type: PlasticType = Field(..., description="Identified or probable plastic type")
    source_type: str = Field(
        default="unknown",
        description="Type of source object (e.g. bottle, cap, food container)",
        max_length=100,
    )
    contamination_level: ContaminationLevel = Field(
        ..., description="Observed contamination level of the item"
    )
    washable: WashableOption = Field(
        ..., description="Whether the item can be washed before reuse"
    )
    intended_reuse: IntendedReuse = Field(
        ..., description="Target reuse application"
    )
    notes: Optional[str] = Field(
        default=None,
        description="Optional user notes about the item",
        max_length=500,
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "plastic_type": "HDPE",
                "source_type": "detergent bottle",
                "contamination_level": "low",
                "washable": "yes",
                "intended_reuse": "modular_block",
                "notes": "Slightly discolored but intact",
            }
        }
    }
