# Plastic Reuse Engine

A deterministic decision support and reuse recommendation engine for evaluating plastic waste reuse potential.

---

## Why this exists

Most plastic "recycling" tools either oversimplify the problem or make unsafe claims about material transformation. This project takes a different approach: a transparent, rule-based engine that evaluates whether a plastic item is a reasonable candidate for simple reuse scenarios — modular blocks, decorative pieces, non-structural panels, or experimental prototypes — based on known material properties, contamination level, and intended use.

The goal is not to simulate industrial recycling. It is to give makers, educators, and community workshops a structured, honest starting point for reuse decisions.

---

## Product scope

- Accepts a plastic item description (type, contamination, washability, intended reuse)
- Optionally accepts a photo (stored for future CV integration)
- Runs a deterministic scoring pipeline against a material knowledge base
- Returns a reuse score (0–100), a verdict, reasons, warnings, and a suggested process
- Does **not** certify safety, food contact, structural integrity, or child-safe use

---

## Safety limitations

> This tool provides an educational and engineering-oriented reuse recommendation based on deterministic rules. It does not certify product safety, food safety, structural integrity, or child-safe use. Any real-world manufacturing or reuse process requires material validation and appropriate safety review.

---

## Architecture overview

```
plastic-reuse-engine/
├── frontend/               # HTML5 + Vanilla JS + CSS3 single-page app
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend/
│   ├── main.py             # FastAPI app entry point
│   ├── requirements.txt
│   ├── data/
│   │   └── plastics_seed.json   # Material knowledge base
│   └── app/
│       ├── api/
│       │   └── routes_analysis.py   # API route handlers
│       ├── core/
│       │   └── config.py            # Constants, thresholds, CORS
│       ├── engine/
│       │   ├── reuse_engine.py      # Deterministic scoring pipeline
│       │   └── plastic_rules.py     # Material profile loader
│       ├── models/
│       │   ├── request_models.py    # Pydantic input models
│       │   └── response_models.py   # Pydantic output models
│       └── services/
│           ├── analysis_service.py  # Orchestration layer
│           └── image_service.py     # Image upload + CV placeholder
└── tests/
    ├── test_reuse_engine.py    # Engine unit tests
    └── test_api.py             # API integration tests
```

### Scoring pipeline

1. Load material profile from `plastics_seed.json`
2. Start from `structural_score_base` (0–100 per material)
3. Apply contamination penalty (`none`: 0, `low`: -5, `medium`: -15, `high`: -30)
4. Apply washability modifier (`yes`: +5, `no` + high contamination: -10)
5. Apply intended reuse compatibility modifier (per material suitability level)
6. Clamp score to [0, 100]
7. Map to verdict: `REJECTED` (0–24), `LIMITED_REUSE` (25–49), `CONDITIONAL_REUSE` (50–74), `GOOD_CANDIDATE` (75–100)

---

## Setup

### Prerequisites

- Python 3.11+
- A modern browser (Chrome, Firefox, Safari, Edge)

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

The API will be available at `http://127.0.0.1:8000`.
Interactive docs: `http://127.0.0.1:8000/docs`

### Frontend

Open `frontend/index.html` directly in your browser, or serve it with any static server:

```bash
# Python built-in server (from the frontend directory)
cd plastic-reuse-engine/frontend
python -m http.server 5500
```

Then open `http://localhost:5500`.

---

## Running tests

```bash
cd plastic-reuse-engine/backend
pytest ../tests/ -v
```

---

## API reference

### `GET /health`
Returns service status.

```json
{ "status": "ok", "version": "0.1.0", "service": "Plastic Reuse Engine" }
```

### `POST /analyze`
Accepts `multipart/form-data`.

| Field | Type | Required | Description |
|---|---|---|---|
| `plastic_type` | string | yes | PET, HDPE, PVC, LDPE, PP, PS, OTHER, UNKNOWN |
| `source_type` | string | no | bottle, cap, tray, etc. |
| `contamination_level` | string | yes | none, low, medium, high |
| `washable` | string | yes | yes, no, unknown |
| `intended_reuse` | string | yes | modular_block, decorative_piece, non_structural_panel, filament_candidate, experimental_prototype |
| `notes` | string | no | Free text, max 500 chars |
| `image` | file | no | Optional image upload |

Example response:

```json
{
  "request_summary": { "plastic_type": "HDPE", "contamination_level": "low", ... },
  "reuse_score": 82,
  "verdict": "GOOD_CANDIDATE",
  "recommended_use": "modular_block",
  "confidence": "deterministic",
  "reasons": ["HDPE has a base structural score of 72/100", ...],
  "warnings": ["Not suitable for food-contact use without specialized validation", ...],
  "suggested_process": ["sorting", "washing", "shredding", "low_risk_remolding"],
  "disclaimer": "This tool provides an educational...",
  "future_cv_ready": true
}
```

### `GET /materials`
Returns all material profiles from the knowledge base.

---

## Future roadmap

### v1 — Stability & UX
- Persistent database (SQLite) for analysis history
- Material comparison view
- Printable PDF report
- Improved mobile camera UX

### v2 — Computer Vision
- Integrate a lightweight image classifier (MobileNet or EfficientNet)
- Auto-suggest plastic type from photo
- Confidence score from CV model displayed alongside deterministic score

### v3 — Community & Scale
- User accounts and saved analyses
- Community-contributed material rules
- API key authentication
- Batch analysis endpoint
- Localization (multi-language support)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
