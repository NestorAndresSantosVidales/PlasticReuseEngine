# Plastic Reuse Engine

> An AI-powered smart recycling assistant that runs entirely on-device — no internet required.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform: Android](https://img.shields.io/badge/Platform-Android-green.svg)](https://developer.android.com)
[![Gemma 4](https://img.shields.io/badge/LLM-Gemma%204%20E2B-orange.svg)](https://ai.google.dev/gemma)
[![LiteRT](https://img.shields.io/badge/Runtime-LiteRT-red.svg)](https://ai.google.dev/edge/litert)

---

## The Opportunity

Every year, **400 million tons of plastic waste** are generated globally. Less than 10% is recycled. The gap is not just infrastructure — it is **knowledge at the point of disposal**. People do not know what type of plastic they are holding, whether it can be reused, or what to do with it.

Existing recycling apps require internet connectivity, manual input, or expensive hardware. Communities in developing countries — where plastic pollution is most severe — have none of these.

**Plastic Reuse Engine** solves this by putting a complete AI recycling advisor directly on a mobile device, mounted on a recycling bin, working offline, speaking the user's language.

---

## What It Does

1. **Detects** the plastic type automatically using the device camera
2. **Scores** the reuse potential using a deterministic rule-based engine
3. **Speaks** a personalized recommendation out loud via Text-to-Speech
4. **Converses** with the user via voice to explore creative reuse options
5. **Runs entirely offline** — no cloud, no subscription, no connectivity required

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PLASTIC REUSE ENGINE                      │
│                                                             │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │  Camera  │───▶│ MobileNetV2  │───▶│  Reuse Engine    │  │
│  │  (Live)  │    │ (TFLite 3MB) │    │  (PHP/Rules)     │  │
│  └──────────┘    └──────────────┘    └────────┬─────────┘  │
│                        │                      │             │
│                   "PP, 73%"              Score: 65/100      │
│                        │                      │             │
│                        └──────────┬───────────┘             │
│                                   ▼                         │
│                        ┌──────────────────┐                 │
│                        │   Gemma 4 E2B    │                 │
│                        │  (Fine-tuned)    │                 │
│                        │  via LiteRT      │                 │
│                        └────────┬─────────┘                 │
│                                 │                           │
│                    ┌────────────▼────────────┐              │
│                    │   Voice Response (TTS)  │              │
│                    │   Voice Input (STT)     │              │
│                    │   Conversation Loop     │              │
│                    └─────────────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

### Components

| Component | Technology | Size | Purpose |
|-----------|-----------|------|---------|
| Visual Detection | MobileNetV2 (custom fine-tuned) | 3 MB | Classify plastic type from camera frame |
| Reuse Scoring | PHP rule-based engine | <1 MB | Deterministic score 0-100 + verdict |
| Language Model | Gemma 4 E2B (LoRA fine-tuned) | ~2 GB | Natural language recommendations + conversation |
| Runtime | MediaPipe LiteRT | — | On-device LLM inference |
| App Shell | Apache Cordova | — | Android APK packaging |
| TTS/STT | Native Android APIs | — | Voice interaction |

---

## Technology Stack

### On-Device AI
- **MobileNetV2** — Custom fine-tuned on 3,700+ labeled plastic images across 8 resin classes (PET, HDPE, PVC, LDPE, PP, PS, OTHER, UNKNOWN). Trained with TensorFlow and exported to TFLite format.
- **Gemma 4 E2B** — Google's multimodal language model, fine-tuned with LoRA adapters using Unsloth for 2x faster training. The model is specialized to interpret computer vision outputs and provide plastic reuse recommendations.
- **MediaPipe LiteRT** — Google AI Edge's runtime for on-device LLM inference. Enables Gemma 4 to run locally on Android devices with 4GB+ RAM.

### Backend
- **PHP** — Deterministic reuse scoring engine. Zero dependencies, deployable on any shared hosting. Implements the full scoring pipeline: base material score + contamination penalty + washability modifier + reuse compatibility modifier.

### Mobile
- **Apache Cordova** — Cross-platform mobile framework. The entire frontend is HTML/CSS/JavaScript packaged as an Android APK.
- **TensorFlow.js** — Browser-compatible ML inference for MobileNetV2 in the WebView.

---

## Methodology

### 1. Visual Classification Pipeline

The camera feed is analyzed every 2 seconds in Kiosk Mode. Each frame is:
1. Captured from the live video stream
2. Resized to 224×224 pixels
3. Passed through MobileNetV2
4. Top-5 predictions are mapped to plastic types via keyword matching
5. Confidence threshold filters low-quality detections

**MobileNetV2 Training:**
- Base model: MobileNetV2 pretrained on ImageNet
- Fine-tuning dataset: 3,700+ images from TrashNet, Kaggle Garbage Classification, Plastic Recycling Codes dataset, and Drinking Waste Classification
- Training: Two-phase (head only → full fine-tune with LoRA)
- Export: TFLite with INT8 quantization (3MB final size)
- Accuracy: ~86% validation accuracy on 8-class plastic classification

### 2. Deterministic Reuse Scoring

The scoring engine is intentionally rule-based — not probabilistic. Every score is fully explainable and traceable.

```
Score = base_structural_score
      + contamination_penalty      (0 to -30)
      + washability_modifier       (-10 to +5)
      + reuse_compatibility_modifier (-35 to +10)
      
Clamped to [0, 100]
```

Verdicts:
- **GOOD_CANDIDATE** (75-100): Ready for reuse with minimal preparation
- **CONDITIONAL_REUSE** (50-74): Reusable with cleaning/processing
- **LIMITED_REUSE** (25-49): Limited options, specific applications only
- **REJECTED** (0-24): Not recommended for reuse in current state

### 3. Gemma 4 Fine-tuning with Unsloth

The language model is fine-tuned specifically to interpret computer vision outputs — not general plastic knowledge. The training data format mirrors the actual system inputs:

```
Input:  "Vision: 'shampoo (72%), lotion (8%)'. Type: HDPE. Score: 85/100."
Output: "HDPE shampoo bottle, score 85/100. Uses: water dispenser for plants,
         brush organizer, or casting mold. HDPE is one of the safest plastics
         to handle and reuse."
```

**Fine-tuning details:**
- Base model: `unsloth/gemma-4-E2B-it-unsloth-bnb-4bit`
- Method: LoRA (Low-Rank Adaptation) with rank=16
- Target modules: q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj
- Training data: 20 curated examples covering all 8 plastic types + conversation flows
- Epochs: 3 | Batch size: 1 | Gradient accumulation: 16
- Hardware: Kaggle T4 GPU (14GB VRAM)
- Training time: ~35 seconds
- Adapter size: 14MB (LoRA weights only)

### 4. Voice Conversation Loop

The Kiosk Mode implements a full voice interaction pipeline:

```
Detection → TTS speaks result
         → TTS asks "Would you like to explore other uses?"
         → STT listens for yes/no
         → If yes: Gemma 4 generates personalized response
                   TTS speaks response
                   STT listens for follow-up
                   Loop continues until timeout
         → Auto-reset after 8 seconds of inactivity
```

This creates a natural, hands-free interaction designed for public recycling bin installations.

---

## Kiosk Mode

The primary deployment scenario is a mobile device mounted on a recycling bin in a public space.

**User flow:**
1. User approaches the bin holding a plastic item
2. Camera detects the plastic automatically (no button press required)
3. System speaks: *"I detected PP plastic. Score 65/100. This can be reused as a planter or organizer. Would you like to know more?"*
4. User responds verbally
5. Gemma 4 continues the conversation with specific recommendations
6. System resets automatically for the next user

**Supported languages:** Spanish (es-ES), English (en-US) — configurable

---

## Dataset

The MobileNetV2 model was trained on a combined dataset from:

| Source | Images | Classes |
|--------|--------|---------|
| [Plastic Recycling Codes](https://www.kaggle.com/datasets/piaoya/plastic-recycling-codes) | 685 | PET, HDPE, PVC, LDPE, PP, PS, OTHER, UNKNOWN |
| [Garbage Classification](https://www.kaggle.com/datasets/asdasdasasdas/garbage-classification) | 482 | OTHER (plastic) |
| [Drinking Waste Classification](https://www.kaggle.com/datasets/arkadiyhacks/drinking-waste-classification) | 2,536 | PET, HDPE |
| **Total** | **3,703** | **8 classes** |

---

## Project Structure

```
plastic-reuse-engine/
├── backend/                    # FastAPI backend (Python)
│   ├── app/
│   │   ├── api/               # REST endpoints
│   │   ├── engine/            # Deterministic scoring engine
│   │   ├── models/            # Pydantic request/response models
│   │   └── services/          # Image and analysis services
│   └── data/
│       └── plastics_seed.json # Material profiles for 8 plastic types
├── frontend/                   # Web frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── app.js                 # Main application logic + AI detection
│   └── styles.css
├── plastic-reuse-app/          # Cordova Android app
│   ├── www/                   # Frontend assets
│   │   ├── app.js             # Cordova-adapted app logic
│   │   ├── gemma.js           # Gemma 4 integration + conversation
│   │   ├── kiosk.js           # Kiosk mode + voice pipeline
│   │   ├── tf.min.js          # TensorFlow.js (bundled)
│   │   ├── mobilenet.min.js   # MobileNet (bundled)
│   │   ├── plastic_classifier.tflite  # Custom trained model
│   │   └── plastic_labels.txt # Class labels
│   ├── platforms/android/     # Android platform files
│   │   └── app/src/main/java/com/plasticreuse/gemma/
│   │       └── GemmaPlugin.java  # Native Gemma 4 via MediaPipe LiteRT
│   └── php-backend/
│       └── analyze.php        # PHP scoring engine (production)
└── model-training/
    ├── train.ipynb            # MobileNetV2 training notebook
    └── gemma4_finetune.py     # Gemma 4 fine-tuning with Unsloth
```

---

## Getting Started

### Prerequisites
- Android device with 4GB+ RAM
- Android Studio + SDK 34+
- Node.js 18+
- Python 3.11+ (for backend)
- Java 17+

### Run the Web Version

```bash
# Start backend
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload

# Serve frontend
cd ..
node plastic-reuse-app/serve.js
# Open http://localhost:3000
```

### Build the Android APK

```powershell
cd plastic-reuse-app
$env:ANDROID_HOME="C:\Users\<user>\AppData\Local\Android\Sdk"
$env:JAVA_HOME="C:\Program Files\Android\Android Studio\jbr"
pnpm exec cordova build android
```

### Train the Models

**MobileNetV2:**
Upload `model-training/train.ipynb` to Google Colab (T4 GPU) and run all cells.

**Gemma 4 Fine-tuning:**
Upload `model-training/gemma4_finetune.py` to Kaggle (T4 GPU) and run as a single cell.

---

## Hackathon Alignment

This project targets the following prize categories:

| Category | Implementation |
|----------|---------------|
| **Best use case with Google AI Edge LiteRT + Gemma 4** | Gemma 4 E2B runs via MediaPipe LiteRT on Android, fully offline |
| **Best fine-tuned Gemma 4 with Unsloth** | LoRA fine-tuning on plastic reuse domain using Unsloth 2x faster training |
| **Best innovative implementation on resource-constrained hardware** | Full AI pipeline (vision + LLM + voice) on a mid-range Android device with 6GB RAM |

---

## Impact

- **Zero connectivity required** — works in rural areas, developing countries, anywhere
- **Any language** — Gemma 4 responds in the user's language automatically
- **Deployable today** — standard Android device + recycling bin mount
- **Explainable AI** — every score is traceable to specific material properties
- **Open source** — fully auditable, forkable, adaptable for local contexts

---

## License

Apache License 2.0 — see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- [Google DeepMind](https://deepmind.google) for Gemma 4
- [Unsloth AI](https://github.com/unslothai/unsloth) for 2x faster fine-tuning
- [Google AI Edge](https://ai.google.dev/edge) for MediaPipe LiteRT
- [TrashNet](https://github.com/garythung/trashnet) for the base plastic dataset
- [Apache Cordova](https://cordova.apache.org) for the mobile framework
