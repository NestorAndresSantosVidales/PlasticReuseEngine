/**
 * Plastic Reuse Engine — Frontend Application
 * Vanilla JS, no framework dependencies.
 */

const API_BASE = "http://localhost:8000";
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

// Photo
const cameraBtn = document.getElementById("cameraBtn");
const fileInput = document.getElementById("fileInput");
const imagePreviewWrap = document.getElementById("imagePreviewWrap");
const imagePreview = document.getElementById("imagePreview");
const clearImageBtn = document.getElementById("clearImageBtn");

// Camera modal
const cameraModal = document.getElementById("cameraModal");
const cameraVideo = document.getElementById("cameraVideo");
const cameraCanvas = document.getElementById("cameraCanvas");
const captureBtn = document.getElementById("captureBtn");
const closeCameraBtn = document.getElementById("closeCameraBtn");

// Result fields
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

let capturedImageBlob = null;
let cameraStream = null;
let lastResult = null;

// ---- Dark mode ----
function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  darkToggle.textContent = dark ? "☀" : "🌙";
  localStorage.setItem("pre_dark", dark ? "1" : "0");
}

darkToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  applyTheme(!isDark);
});

applyTheme(localStorage.getItem("pre_dark") === "1");

// ---- Image handling ----
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  capturedImageBlob = file;
  showImagePreview(URL.createObjectURL(file));
});

clearImageBtn.addEventListener("click", () => {
  capturedImageBlob = null;
  imagePreview.src = "";
  imagePreviewWrap.hidden = true;
  fileInput.value = "";
});

function showImagePreview(src) {
  imagePreview.src = src;
  imagePreviewWrap.hidden = false;
}

// ---- Camera ----
cameraBtn.addEventListener("click", () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showError("Camera not supported in this browser. Please upload an image instead.");
    return;
  }

  // Show modal BEFORE requesting stream so video element is visible
  cameraModal.classList.add("is-open");
  cameraModal.hidden = false;
  captureBtn.disabled = true;
  captureBtn.textContent = "⏳ Loading...";

  // Wait one animation frame so the modal is painted before assigning srcObject
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          cameraStream = stream;
          cameraVideo.srcObject = stream;
          cameraVideo.play();

          const status = document.getElementById("cameraStatus");
          let elapsed = 0;
          const check = setInterval(() => {
            elapsed += 100;
            if (cameraVideo.videoWidth > 0 && cameraVideo.videoHeight > 0) {
              clearInterval(check);
              if (status) status.textContent = "Camera ready.";
              captureBtn.disabled = false;
              captureBtn.textContent = "📸 Capture";
              captureBtn.focus();
            } else if (elapsed >= 3000) {
              clearInterval(check);
              captureBtn.disabled = false;
              captureBtn.textContent = "📸 Capture";
            }
          }, 100);
        })
        .catch((err) => {
          closeCamera();
          if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
            showError("Camera permission denied. Click the camera icon in the address bar to allow access, then try again.");
          } else if (err.name === "NotFoundError") {
            showError("No camera found on this device. Please use the Upload Image option instead.");
          } else {
            showError("Could not access camera: " + err.message);
          }
        });
    });
  });
});

captureBtn.addEventListener("click", () => {
  const w = cameraVideo.videoWidth;
  const h = cameraVideo.videoHeight;
  if (!w || !h) {
    showError("Camera isn't ready yet — please wait a moment and try again.");
    return;
  }
  cameraCanvas.width = w;
  cameraCanvas.height = h;
  cameraCanvas.getContext("2d").drawImage(cameraVideo, 0, 0);
  cameraCanvas.toBlob((blob) => {
    if (!blob) {
      showError("Failed to capture image. Please try again.");
      return;
    }
    capturedImageBlob = new File([blob], "capture.jpg", { type: "image/jpeg" });
    showImagePreview(URL.createObjectURL(capturedImageBlob));
    closeCamera();
  }, "image/jpeg", 0.9);
});

closeCameraBtn.addEventListener("click", closeCamera);

cameraModal.addEventListener("click", (e) => {
  if (e.target === cameraModal) closeCamera();
});

function closeCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((t) => t.stop());
    cameraStream = null;
  }
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
    const response = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      body: formData,
    });

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
  } catch (err) {
    showError(err.message || "Failed to connect to the analysis server. Is the backend running?");
  } finally {
    setLoading(false);
  }
});

// ---- Render result ----
const VERDICT_CLASS = {
  GOOD_CANDIDATE: "good",
  CONDITIONAL_REUSE: "conditional",
  LIMITED_REUSE: "limited",
  REJECTED: "rejected",
};

const VERDICT_LABEL = {
  GOOD_CANDIDATE: "Good Candidate",
  CONDITIONAL_REUSE: "Conditional Reuse",
  LIMITED_REUSE: "Limited Reuse",
  REJECTED: "Rejected",
};

function renderResult(data) {
  const cls = VERDICT_CLASS[data.verdict] || "rejected";
  scoreValue.textContent = data.reuse_score;
  scoreCircle.className = `score-circle ${cls}`;
  verdictBadge.textContent = VERDICT_LABEL[data.verdict] || data.verdict;
  verdictBadge.className = `verdict-badge ${cls}`;
  confidenceLabel.textContent = `Confidence: ${data.confidence}`;
  recommendedUse.textContent = `Recommended use: ${formatKey(data.recommended_use)}`;
  renderList(reasonList, data.reasons, false);
  renderList(warningList, data.warnings, false);
  renderList(processList, data.suggested_process, true);
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
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---- Download report ----
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
  lastResult = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---- History ----
function saveToHistory(data) {
  const history = loadHistory();
  const entry = {
    id: Date.now(),
    plastic_type: data.request_summary.plastic_type,
    verdict: data.verdict,
    score: data.reuse_score,
    intended_reuse: data.request_summary.intended_reuse,
    timestamp: new Date().toLocaleString(),
    full: data,
  };
  history.unshift(entry);
  if (history.length > MAX_HISTORY) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
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
    li.setAttribute("aria-label", `View result for ${entry.plastic_type}`);
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
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") li.click();
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

function showError(msg) {
  errorMessage.textContent = msg;
  errorBanner.hidden = false;
}

function hideError() {
  errorBanner.hidden = true;
  errorMessage.textContent = "";
}

dismissError.addEventListener("click", hideError);

// ---- Init ----
renderHistory();
