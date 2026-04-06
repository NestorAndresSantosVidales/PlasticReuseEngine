"""
Application configuration and constants.
"""

APP_NAME = "Plastic Reuse Engine"
APP_VERSION = "0.1.0"
APP_DESCRIPTION = (
    "A deterministic decision support and reuse recommendation engine "
    "for evaluating plastic waste reuse potential."
)

# CORS origins allowed for local development
CORS_ORIGINS = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5500",
    "http://127.0.0.1",
    "http://127.0.0.1:5500",
    "null",  # file:// origin for direct HTML open
]

# Path to the plastic seed data file
import os
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data")
PLASTICS_SEED_PATH = os.path.join(DATA_DIR, "plastics_seed.json")

# Temporary upload directory
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "uploads")

# Scoring thresholds for verdict determination
VERDICT_THRESHOLDS = {
    "REJECTED": (0, 24),
    "LIMITED_REUSE": (25, 49),
    "CONDITIONAL_REUSE": (50, 74),
    "GOOD_CANDIDATE": (75, 100),
}

# Contamination score penalties
CONTAMINATION_PENALTIES = {
    "none": 0,
    "low": -5,
    "medium": -15,
    "high": -30,
}

# Washability modifiers
WASHABILITY_MODIFIERS = {
    "yes": 5,
    "no": 0,
    "unknown": 0,
}

# Intended reuse compatibility modifiers per plastic suitability level
REUSE_COMPATIBILITY = {
    "modular_block": {
        "good": 10,
        "moderate": 0,
        "poor": -20,
        "very_poor": -35,
        "unknown": -20,
    },
    "decorative_piece": {
        "good": 8,
        "moderate": 5,
        "poor": -5,
        "very_poor": -15,
        "unknown": -10,
    },
    "non_structural_panel": {
        "good": 8,
        "moderate": 3,
        "poor": -8,
        "very_poor": -20,
        "unknown": -10,
    },
    "filament_candidate": {
        "good": 5,
        "moderate": 0,
        "poor": -15,
        "very_poor": -30,
        "unknown": -20,
    },
    "experimental_prototype": {
        "good": 5,
        "moderate": 5,
        "poor": 0,
        "very_poor": -10,
        "unknown": -5,
    },
}

DISCLAIMER = (
    "This tool provides an educational and engineering-oriented reuse recommendation "
    "based on deterministic rules. It does not certify product safety, food safety, "
    "structural integrity, or child-safe use. Any real-world manufacturing or reuse "
    "process requires material validation and appropriate safety review."
)
