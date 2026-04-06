/**
 * Plastic Reuse Engine — Cordova App
 * TensorFlow.js MobileNet for auto-detection from camera photo.
 */

const API_BASE = "http://wellnestfamily.com/wnf/barnav";
const HISTORY_KEY = "pre_history";
const MAX_HISTORY = 10;

// ---- DOM refs ----
const form = document.getElementById("analysisForm");
const analyzeBtn = document.getElementById("analyzeBtn");
const loadingState = document.getElementById("loadingState");
const errorBanner = document.getElementById("errorBanner");
const errorMessage = document.getElementById("errorMessage");
const dismissError = document.getElementById("dismissError");
const resultsSection = document.getElementById("resultsSection");
const historySection = document.getElementById("historySection");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const darkToggle = document.getElementById("darkToggle");
const cameraBtn = document.getElementById("cameraBtn");
const fileInput = document.getElementById("fileInput");
const imagePreviewWrap = document.getElementById("imagePreviewWrap");
const imagePreview = document.getElementById("imagePreview");
const clearImageBtn = document.getElementById("clearImageBtn");
const cameraModal = document.getElementById("cameraModal");
const cameraVideo = document.getElementById("cameraVideo");
const cameraCanvas = document.getElementById("cameraCanvas");
const captureBtn = document.getElementById("captureBtn");
const closeCameraBtn = document.getElementById("closeCameraBtn");
const scoreValue = document.getElementById("scoreValue");
const scoreCircle = document.getElementById("scoreCircle");
const verdictBadge = document.getElementById("verdictBadge");
const confidenceLabel = document.getElementById("confidenceLabel");
const recommendedUse = document.getElementById("recommendedUse");
const reasonList = document.getElementById("reasonList");
const processList = document.getElementById("processList");
const warningList = document.getElementById("warningList");
const disclaimerText = document.getElementById("disclaimerText");
const downloadBtn = document.getElementById("downloadBtn");
const newAnalysisBtn = document.getElementById("newAnalysisBtn");
const aiResultBanner = document.getElementById("aiResultBanner");
const aiResultText = document.getElementById("aiResultText");
const aiApplyBtn = document.getElementById("aiApplyBtn");

let capturedImageBlob = null;
let cameraStream = null;
let lastResult = null;
let mnModel = null;
let pendingAiDetection = null; // stores detected form values before user confirms

// ---- TensorFlow.js MobileNet ----
// Keyword → form field mappings
const OBJECT_TO_SOURCE = {
  bottle: "bottle", "water bottle": "bottle", "plastic bottle": "bottle",
  "wine bottle": "bottle", "beer bottle": "bottle",
  "pop bottle": "bottle", "soda bottle": "bottle",
  cap: "cap", lid: "cap", "bottle cap": "cap",
  "food container": "food_container", container: "food_container",
  "plastic bag": "bag", bag: "bag",
  tray: "tray", "plastic tray": "tray",
  "detergent": "detergent_bottle", "soap dispenser": "detergent_bottle",
  "plastic wrap": "packaging_film", "cling wrap": "packaging_film",
};

const DIRTY_KEYWORDS = ["dirty", "stained", "soiled", "used", "waste", "garbage", "trash", "rubbish", "litter"];
const CLEAN_KEYWORDS = ["clean", "new", "unused", "clear", "transparent"];

// Plastic type hints from object labels (best-effort)
const OBJECT_TO_PLASTIC = {
  "water bottle": "PET", "pop bottle": "PET", "soda bottle": "PET", "plastic bottle": "PET",
  "milk bottle": "HDPE", "detergent": "HDPE",
  "plastic bag": "LDPE", "bag": "LDPE",
  "yogurt": "PP", "tray": "PP",
  "foam": "PS", "styrofoam": "PS",
};

// ---- AI Detection with custom TFLite model ----
let plasticLabels = null;

async function loadLabels() {
  if (plasticLabels) return plasticLabels;
  try {
    const res = await fetch("plastic_labels.txt");
    const text = await res.text();
    plasticLabels = text.trim().split("\n").map(l => l.trim());
  } catch (e) {
    plasticLabels = ["OTHER", "UNKNOWN"];
  }
  return plasticLabels;
}

async function loadModel() {
  if (mnModel) return mnModel;
  try {
    // Try custom plastic classifier first
    mnModel = await tf.loadLayersModel("plastic_classifier.tflite");
    mnModel._isCustom = true;
  } catch (e) {
    try {
      // Use mobilenet package which handles model loading correctly
      const net = await mobilenet.load({ version: 1, alpha: 0.25 });
      mnModel = net;
      mnModel._isCustom = false;
      mnModel._isMobilenet = true;
    } catch (e2) {
      console.warn("Model failed to load:", e2.message);
    }
  }
  return mnModel;
}

// ImageNet index → plastic type mapping for MobileNet fallback
const IMAGENET_TO_PLASTIC = {
  // Bottles → PET
  440: {p:"PET", o:"bottle"}, 441: {p:"PET", o:"bottle"},
  737: {p:"PET", o:"bottle"}, 898: {p:"PET", o:"bottle"},
  // Milk/detergent → HDPE
  567: {p:"HDPE", o:"detergent_bottle"}, 445: {p:"HDPE", o:"bottle"},
  // Bags/film → LDPE
  899: {p:"LDPE", o:"bag"}, 720: {p:"LDPE", o:"packaging_film"},
  // Cups/caps/containers → PP
  428: {p:"PP", o:"cap"}, 648: {p:"PP", o:"food_container"},
  // Foam/trays → PS
  881: {p:"PS", o:"tray"}, 463: {p:"PS", o:"tray"},
  // Generic plastic
  542: {p:"OTHER", o:"food_container"}, 411: {p:"OTHER", o:"bag"},
};

async function analyzeImageWithAI(imgElement) {
  const model = await loadModel();
  const labels = await loadLabels();
  if (!model) return null;

  try {
    // MobileNet package — use classify() API
    if (model._isMobilenet) {
      const predictions = await model.classify(imgElement, 5);
      const allLabels = predictions.map(p => p.className.toLowerCase()).join(" ");

      let plasticType = "UNKNOWN", sourceType = "other";
      if (allLabels.match(/bottle|container|jar|flask|water bottle|pop bottle/)) { plasticType = "PET";  sourceType = "bottle"; }
      else if (allLabels.match(/bag|wrap|film|plastic bag|shopping bag|grocery bag|ziploc/)) { plasticType = "LDPE"; sourceType = "bag"; }
      else if (allLabels.match(/cup|tub|bucket|beaker|bathtub|goblet|drinking/))     { plasticType = "PP";   sourceType = "food_container"; }
      else if (allLabels.match(/foam|styrofoam|tray|plate|egg carton/))              { plasticType = "PS";   sourceType = "tray"; }
      else if (allLabels.match(/detergent|soap|shampoo|jug|lotion|deodorant|antiperspirant|cosmetic|dispenser|spray|aerosol/)) { plasticType = "HDPE"; sourceType = "detergent_bottle"; }
      else if (allLabels.match(/cap|lid|stopper|cork/))                              { plasticType = "PP";   sourceType = "cap"; }
      else if (allLabels.match(/tissue|paper|towel|toilet/))                         { plasticType = "PP";   sourceType = "food_container"; }
      else if (allLabels.match(/water|drink|beverage|soda|pop/))                     { plasticType = "PET";  sourceType = "bottle"; }
      else if (allLabels.match(/milk|dairy|gallon/))                                 { plasticType = "HDPE"; sourceType = "bottle"; }
      else if (allLabels.match(/tube|toothpaste|cream|ointment/))                    { plasticType = "LDPE"; sourceType = "other"; }

      const top = predictions[0];
      return {
        plasticType, sourceType,
        contamination: "low", washable: "unknown",
        labels: predictions.slice(0,3).map(p=>`${p.className} (${(p.probability*100).toFixed(0)}%)`).join(", "),
        confidence: parseFloat((top.probability*100).toFixed(0)),
      };
    }

    // Custom TFLite model — use predict() API
    const tensor = tf.browser.fromPixels(imgElement)
      .resizeNearestNeighbor([224, 224])
      .toFloat().div(255.0).expandDims();
    const output = model.predict(tensor);
    const scores = await output.data();
    tensor.dispose();
    output.dispose();

    const topIdx = scores.indexOf(Math.max(...scores));
    const plasticType = labels[topIdx] || "UNKNOWN";
    const PLASTIC_TO_SOURCE = {
      "PET":"bottle","HDPE":"detergent_bottle","LDPE":"bag",
      "PP":"food_container","PS":"tray","PVC":"other","OTHER":"other","UNKNOWN":"other",
    };
    const topResults = Array.from(scores)
      .map((s, i) => ({ label: labels[i] || `class_${i}`, score: s }))
      .sort((a, b) => b.score - a.score).slice(0, 3)
      .map(r => `${r.label} (${(r.score*100).toFixed(0)}%)`).join(", ");
    return {
      plasticType, sourceType: PLASTIC_TO_SOURCE[plasticType] || "other",
      contamination: "low", washable: "unknown",
      labels: topResults, confidence: parseFloat((scores[topIdx]*100).toFixed(0)),
    };

  } catch (e) {
    console.warn("AI inference failed:", e.message);
    return null;
  }
}

function applyAiDetection(detection) {
  if (!detection) return;
  if (detection.sourceType) document.getElementById("sourceType").value = detection.sourceType;
  if (detection.plasticType) document.getElementById("plasticType").value = detection.plasticType;
  if (detection.contamination) document.getElementById("contamination").value = detection.contamination;
  if (detection.washable) document.getElementById("washable").value = detection.washable;
}

async function runAiOnImage(imgElement) {
  aiResultBanner.hidden = true;
  const detection = await analyzeImageWithAI(imgElement);
  if (!detection) return;
  pendingAiDetection = detection;
  aiResultText.textContent = `AI detected: ${detection.labels} — confidence: ${detection.confidence}%`;
  aiResultBanner.hidden = false;
}

aiApplyBtn.addEventListener("click", () => {
  if (pendingAiDetection) {
    applyAiDetection(pendingAiDetection);
    aiResultBanner.hidden = true;
  }
});

// ---- Dark mode ----
function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  darkToggle.textContent = dark ? "☀" : "🌙";
  localStorage.setItem("pre_dark", dark ? "1" : "0");
}
darkToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.getAttribute("data-theme") !== "dark");
});
applyTheme(localStorage.getItem("pre_dark") === "1");

// ---- Image handling ----
fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  capturedImageBlob = file;
  // Use FileReader for Android compatibility instead of blob URL
  const reader = new FileReader();
  reader.onload = (ev) => {
    const src = ev.target.result;
    showImagePreview(src);
    const img = new Image();
    img.onload = () => runAiOnImage(img);
    img.src = src;
  };
  reader.readAsDataURL(file);
});

clearImageBtn.addEventListener("click", () => {
  capturedImageBlob = null;
  imagePreview.src = "";
  imagePreviewWrap.hidden = true;
  fileInput.value = "";
  aiResultBanner.hidden = true;
});

function showImagePreview(src) {
  imagePreview.src = src;
  imagePreviewWrap.hidden = false;
}

// ---- Camera ----
cameraBtn.addEventListener("click", () => {
  // In Cordova/Android use the native camera plugin
  if (window.cordova && navigator.camera) {
    navigator.camera.getPicture(
      (imageData) => {
        // imageData is base64
        const src = "data:image/jpeg;base64," + imageData;
        fetch(src).then(r => r.blob()).then(blob => {
          capturedImageBlob = new File([blob], "capture.jpg", { type: "image/jpeg" });
          showImagePreview(src);
          const img = new Image();
          img.onload = () => runAiOnImage(img);
          img.src = src;
        });
      },
      (err) => showError("Camera error: " + err),
      {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 640,
        targetHeight: 640,
        correctOrientation: true,
      }
    );
    return;
  }

  // Browser fallback (getUserMedia)
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showError("Camera not supported in this browser.");
    return;
  }
  cameraModal.classList.add("is-open");
  cameraModal.hidden = false;
  captureBtn.disabled = true;
  captureBtn.textContent = "⏳ Loading...";

  requestAnimationFrame(() => requestAnimationFrame(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        cameraStream = stream;
        cameraVideo.srcObject = stream;
        cameraVideo.play();
        const status = document.getElementById("cameraStatus");
        let elapsed = 0;
        const check = setInterval(() => {
          elapsed += 100;
          if (cameraVideo.videoWidth > 0) {
            clearInterval(check);
            if (status) status.textContent = "Camera ready.";
            captureBtn.disabled = false;
            captureBtn.textContent = "📸 Capture";
          } else if (elapsed >= 3000) {
            clearInterval(check);
            captureBtn.disabled = false;
            captureBtn.textContent = "📸 Capture";
          }
        }, 100);
      })
      .catch((err) => {
        closeCamera();
        showError("Could not access camera: " + err.message);
      });
  }));
});

captureBtn.addEventListener("click", () => {
  const w = cameraVideo.videoWidth;
  const h = cameraVideo.videoHeight;
  if (!w || !h) { showError("Camera isn't ready yet."); return; }
  cameraCanvas.width = w;
  cameraCanvas.height = h;
  cameraCanvas.getContext("2d").drawImage(cameraVideo, 0, 0);
  cameraCanvas.toBlob((blob) => {
    if (!blob) { showError("Failed to capture image."); return; }
    capturedImageBlob = new File([blob], "capture.jpg", { type: "image/jpeg" });
    const url = URL.createObjectURL(capturedImageBlob);
    showImagePreview(url);
    closeCamera();
    // Run AI on captured frame
    const img = new Image();
    img.onload = () => runAiOnImage(img);
    img.src = url;
  }, "image/jpeg", 0.9);
});

closeCameraBtn.addEventListener("click", closeCamera);
cameraModal.addEventListener("click", (e) => { if (e.target === cameraModal) closeCamera(); });

function closeCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
  cameraVideo.srcObject = null;
  cameraModal.classList.remove("is-open");
  cameraModal.hidden = true;
}

// ---- Form validation ----
const requiredFields = [
  { id: "plasticType", errorId: "plasticTypeError", label: "Plastic type" },
  { id: "contamination", errorId: "contaminationError", label: "Contamination level" },
  { id: "washable", errorId: "washableError", label: "Washable" },
  { id: "intendedReuse", errorId: "intendedReuseError", label: "Intended reuse" },
];

function validateForm() {
  let valid = true;
  requiredFields.forEach(({ id, errorId, label }) => {
    const el = document.getElementById(id);
    const err = document.getElementById(errorId);
    if (!el.value) {
      err.textContent = `${label} is required.`;
      el.setAttribute("aria-invalid", "true");
      valid = false;
    } else {
      err.textContent = "";
      el.removeAttribute("aria-invalid");
    }
  });
  return valid;
}

requiredFields.forEach(({ id, errorId }) => {
  document.getElementById(id).addEventListener("change", () => {
    document.getElementById(errorId).textContent = "";
    document.getElementById(id).removeAttribute("aria-invalid");
  });
});

// ---- Form submit ----
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setLoading(true);
  hideError();
  resultsSection.hidden = true;

  const formData = new FormData();
  formData.append("plastic_type", document.getElementById("plasticType").value);
  formData.append("source_type", document.getElementById("sourceType").value);
  formData.append("contamination_level", document.getElementById("contamination").value);
  formData.append("washable", document.getElementById("washable").value);
  formData.append("intended_reuse", document.getElementById("intendedReuse").value);
  const notes = document.getElementById("notes").value.trim();
  if (notes) formData.append("notes", notes);
  if (capturedImageBlob) formData.append("image", capturedImageBlob);

  try {
    const response = await fetch(`${API_BASE}/analyze.php`, { method: "POST", body: formData });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.detail || `Server error: ${response.status}`);
    }
    const data = await response.json();
    lastResult = data;
    renderResult(data);
    saveToHistory(data);
    renderHistory();
    resultsSection.hidden = false;
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });

    // Activate Gemma chat and generate initial insight
    const gemmaSection = document.getElementById('gemmaSection');
    if (gemmaSection) {
      gemmaSection.hidden = false;
      chatHistory.length = 0; // reset
      renderChat();
      askGemma(data); // auto-generate first insight
    }
  } catch (err) {
    showError(err.message || "Failed to connect to the analysis server. Is the backend running?");
  } finally {
    setLoading(false);
  }
});

// ---- Render result ----
const VERDICT_CLASS = { GOOD_CANDIDATE: "good", CONDITIONAL_REUSE: "conditional", LIMITED_REUSE: "limited", REJECTED: "rejected" };
const VERDICT_LABEL = { GOOD_CANDIDATE: "Good Candidate", CONDITIONAL_REUSE: "Conditional Reuse", LIMITED_REUSE: "Limited Reuse", REJECTED: "Rejected" };

function renderResult(data) {
  const cls = VERDICT_CLASS[data.verdict] || "rejected";
  scoreValue.textContent = data.reuse_score;
  scoreCircle.className = `score-circle ${cls}`;
  verdictBadge.textContent = VERDICT_LABEL[data.verdict] || data.verdict;
  verdictBadge.className = `verdict-badge ${cls}`;
  confidenceLabel.textContent = `Confidence: ${data.confidence}`;
  recommendedUse.textContent = `Recommended use: ${formatKey(data.recommended_use)}`;
  renderList(reasonList, data.reasons);
  renderList(warningList, data.warnings);
  renderList(processList, data.suggested_process);
  disclaimerText.textContent = data.disclaimer;
}

function renderList(el, items) {
  el.innerHTML = "";
  (items || []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = formatKey(item);
    el.appendChild(li);
  });
}

function formatKey(str) {
  if (!str) return "";
  return str.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// ---- Download ----
downloadBtn.addEventListener("click", () => {
  if (!lastResult) return;
  const blob = new Blob([JSON.stringify(lastResult, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reuse-report-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

newAnalysisBtn.addEventListener("click", () => {
  form.reset();
  capturedImageBlob = null;
  imagePreview.src = "";
  imagePreviewWrap.hidden = true;
  fileInput.value = "";
  resultsSection.hidden = true;
  aiResultBanner.hidden = true;
  lastResult = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---- History ----
function saveToHistory(data) {
  const history = loadHistory();
  history.unshift({
    id: Date.now(),
    plastic_type: data.request_summary.plastic_type,
    verdict: data.verdict,
    score: data.reuse_score,
    intended_reuse: data.request_summary.intended_reuse,
    timestamp: new Date().toLocaleString(),
    full: data,
  });
  if (history.length > MAX_HISTORY) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}

function renderHistory() {
  const history = loadHistory();
  if (!history.length) { historySection.hidden = true; return; }
  historyList.innerHTML = "";
  history.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.setAttribute("role", "button");
    li.setAttribute("tabindex", "0");
    li.innerHTML = `
      <span>${entry.plastic_type} — ${formatKey(entry.intended_reuse)}</span>
      <span class="history-item-meta">Score: ${entry.score} &bull; ${VERDICT_LABEL[entry.verdict] || entry.verdict} &bull; ${entry.timestamp}</span>
    `;
    li.addEventListener("click", () => {
      lastResult = entry.full;
      renderResult(entry.full);
      resultsSection.hidden = false;
      resultsSection.scrollIntoView({ behavior: "smooth" });
    });
    historyList.appendChild(li);
  });
  historySection.hidden = false;
}

clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});

// ---- Utilities ----
function setLoading(on) {
  loadingState.hidden = !on;
  analyzeBtn.disabled = on;
  analyzeBtn.textContent = on ? "Analyzing..." : "Analyze Item";
}
function showError(msg) { errorMessage.textContent = msg; errorBanner.hidden = false; }
function hideError() { errorBanner.hidden = true; errorMessage.textContent = ""; }
dismissError.addEventListener("click", hideError);

// ---- Init ----
renderHistory();
// Preload model and labels in background
Promise.all([loadModel(), loadLabels()])
  .then(() => console.log("Model and labels ready"))
  .catch(() => {});

// ---- Gemma chat handler ----
const gemmaSendBtn = document.getElementById('gemmaSendBtn');
const gemmaInput = document.getElementById('gemmaInput');

if (gemmaSendBtn) {
  gemmaSendBtn.addEventListener('click', () => {
    const q = gemmaInput.value.trim();
    if (!q || !lastResult) return;
    gemmaInput.value = '';
    askGemma(lastResult, q);
  });
}
if (gemmaInput) {
  gemmaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') gemmaSendBtn.click();
  });
}

// Init Gemma in background
initGemma().catch(() => {});
