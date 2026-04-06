# Contributing to Plastic Reuse Engine

Thanks for your interest in contributing. This guide covers how to run the project locally, how to test it, coding conventions, and how to propose new material rules.

---

## Running locally

### Backend

```bash
cd plastic-reuse-engine/backend
python -m venv .venv

# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend

Open `frontend/index.html` in a browser, or use a local static server:

```bash
cd plastic-reuse-engine/frontend
python -m http.server 5500
```

---

## Running tests

```bash
cd plastic-reuse-engine/backend
pytest ../tests/ -v
```

All tests should pass before submitting a pull request. Add tests for any new engine logic or API behavior.

---

## Coding conventions

- Python: follow PEP 8, use type hints throughout
- Keep functions small and single-purpose
- Comments only where the logic is non-obvious
- Pydantic models for all API inputs and outputs
- No hardcoded magic numbers — use `config.py` constants
- Frontend: vanilla JS only, no framework dependencies
- CSS: use CSS custom properties (variables), mobile-first

---

## How to propose new material rules

Material profiles live in `backend/data/plastics_seed.json`. Each entry follows this schema:

```json
{
  "PLASTIC_CODE": {
    "full_name": "Human-readable name",
    "structural_score_base": 0,
    "heat_resistance": "low | moderate | high | very_low | unknown",
    "contamination_sensitivity": "low | moderate | high | very_high",
    "washability_bonus_possible": true,
    "modular_block_suitability": "good | moderate | poor | very_poor",
    "decorative_suitability": "good | moderate | poor | very_poor",
    "filament_suitability": "good | moderate | poor | very_poor",
    "default_recommended_use": "one of the IntendedReuse enum values",
    "warnings": ["..."],
    "allowed_processes": ["..."],
    "notes": "Brief description"
  }
}
```

To propose a new rule or update an existing one:

1. Edit `plastics_seed.json` with your proposed changes
2. Add or update tests in `tests/test_reuse_engine.py` that validate the expected scoring behavior
3. Open a pull request with a clear description of the material, your sources, and the reasoning behind the score values

Please cite sources for material properties (e.g., engineering data sheets, peer-reviewed literature). Do not invent scores without a basis.

---

## Proposing new features

Open a GitHub issue with:
- A clear description of the feature
- The user story it addresses
- Any relevant technical notes

For engine changes, include expected scoring behavior and edge cases.

---

## Safety note

Never add rules that claim food safety, child safety, or structural certification. All material profiles must include appropriate warnings. The engine is a decision support tool, not a safety authority.
