/**
 * Kiosk Mode — Plastic Reuse Engine
 * Continuous camera detection for recycling bin installation.
 * Auto-detects plastic, speaks result via TTS, resets after timeout.
 */

const KIOSK_CONFIG = {
  scanInterval: 2000,
  confidenceThreshold: 0.08, // low threshold — MobileNet generic model
  resetDelay: 8000,
  language: 'es-ES',
};

let kioskActive = false;
let kioskStream = null;
let kioskScanTimer = null;
let kioskResetTimer = null;
let kioskVideo = null;
let kioskCanvas = null;
let lastDetectedType = null;
let isSpeaking = false;

// ---- TTS ----
function speak(text, lang = KIOSK_CONFIG.language) {
  // Use native TTS plugin if available (Android)
  if (window.TTS) {
    TTS.speak({
      text: text,
      locale: lang,
      rate: 0.9,
    }, () => { isSpeaking = false; }, () => { isSpeaking = false; });
    isSpeaking = true;
    return;
  }
  // Browser fallback
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang;
  utt.rate = 0.9;
  utt.pitch = 1.0;
  utt.volume = 1.0;
  isSpeaking = true;
  utt.onend = () => { isSpeaking = false; };
  utt.onerror = () => { isSpeaking = false; };
  window.speechSynthesis.speak(utt);
}

// ---- Recycling messages per plastic type ----
const RECYCLING_MESSAGES = {
  es: {
    PET:  "Detecté plástico PET. Deposítalo en la caneca azul de reciclaje. Con este material se fabrican fibras textiles, alfombras y nuevas botellas.",
    HDPE: "Detecté plástico HDPE. Es uno de los plásticos más reciclables. Deposítalo limpio en la caneca azul. Se usa para fabricar tuberías, muebles y envases.",
    PP:   "Detecté polipropileno. Deposítalo en la caneca de reciclaje. Con este plástico se fabrican tapas, recipientes y piezas de automóviles.",
    PS:   "Detecté poliestireno. Este plástico es difícil de reciclar. Deposítalo en la caneca gris si está contaminado, o en la azul si está limpio.",
    LDPE: "Detecté polietileno de baja densidad. Deposítalo en puntos especiales de recolección de bolsas plásticas. Se puede convertir en madera plástica.",
    PVC:  "Detecté PVC. Este plástico requiere manejo especial. No lo mezcles con otros plásticos. Deposítalo en el contenedor especial para PVC.",
    OTHER: "Detecté plástico mixto. Revisa el símbolo de reciclaje en el envase para clasificarlo correctamente.",
    UNKNOWN: "No pude identificar el tipo de plástico. Busca el símbolo de reciclaje en el envase y deposítalo en la caneca correspondiente.",
  },
  en: {
    PET:  "I detected PET plastic. Place it in the blue recycling bin. This material is used to make textile fibers, carpets, and new bottles.",
    HDPE: "I detected HDPE plastic. It is one of the most recyclable plastics. Place it clean in the blue bin. Used to make pipes, furniture, and containers.",
    PP:   "I detected polypropylene. Place it in the recycling bin. This plastic is used to make caps, containers, and car parts.",
    PS:   "I detected polystyrene. This plastic is hard to recycle. Place it in the gray bin if contaminated, or blue bin if clean.",
    LDPE: "I detected low-density polyethylene. Take it to special plastic bag collection points. It can be converted into plastic lumber.",
    PVC:  "I detected PVC. This plastic requires special handling. Do not mix with other plastics. Place it in the special PVC container.",
    OTHER: "I detected mixed plastic. Check the recycling symbol on the container to classify it correctly.",
    UNKNOWN: "I could not identify the plastic type. Find the recycling symbol on the container and place it in the correct bin.",
  }
};

function getRecyclingMessage(plasticType) {
  const lang = KIOSK_CONFIG.language.startsWith('es') ? 'es' : 'en';
  return RECYCLING_MESSAGES[lang][plasticType] || RECYCLING_MESSAGES[lang].UNKNOWN;
}

// ---- Kiosk UI ----
function updateKioskDisplay(plasticType, score, verdict, gemmaText) {
  const display = document.getElementById('kioskDisplay');
  if (!display) return;

  const COLORS = {
    GOOD_CANDIDATE: '#16a34a',
    CONDITIONAL_REUSE: '#d97706',
    LIMITED_REUSE: '#ea580c',
    REJECTED: '#dc2626',
  };

  const ICONS = { PET: '🍶', HDPE: '🧴', PP: '🥤', PS: '📦', LDPE: '🛍', PVC: '⚠️', OTHER: '♻️', UNKNOWN: '❓' };

  display.innerHTML = `
    <div class="kiosk-result" style="border-color: ${COLORS[verdict] || '#6b7280'}">
      <div class="kiosk-icon">${ICONS[plasticType] || '♻️'}</div>
      <div class="kiosk-type">${plasticType}</div>
      <div class="kiosk-score" style="color: ${COLORS[verdict] || '#6b7280'}">${score}/100</div>
      <div class="kiosk-message">${gemmaText || getRecyclingMessage(plasticType)}</div>
      <div class="kiosk-reset-bar"><div class="kiosk-reset-progress" id="kioskResetProgress"></div></div>
    </div>
  `;

  // Animate reset bar
  const bar = document.getElementById('kioskResetProgress');
  if (bar) {
    bar.style.transition = `width ${KIOSK_CONFIG.resetDelay}ms linear`;
    setTimeout(() => { bar.style.width = '100%'; }, 50);
  }
}

function resetKioskDisplay() {
  const display = document.getElementById('kioskDisplay');
  if (!display) return;
  display.innerHTML = `
    <div class="kiosk-idle">
      <div class="kiosk-idle-icon">♻️</div>
      <p>Acerca tu plástico a la cámara</p>
      <p class="kiosk-idle-sub">Hold plastic in front of camera</p>
    </div>
  `;
  lastDetectedType = null;
}

// ---- Shared detection handler ----
async function processKioskDetection(detection, img) {
  lastDetectedType = detection.plasticType;
  clearTimeout(kioskResetTimer);

  let analysisResult = null;
  try {
    const fd = new FormData();
    fd.append('plastic_type', detection.plasticType);
    fd.append('source_type', detection.sourceType || 'other');
    fd.append('contamination_level', 'low');
    fd.append('washable', 'unknown');
    fd.append('intended_reuse', 'experimental_prototype');
    const res = await fetch(`${API_BASE}/analyze.php`, { method: 'POST', body: fd });
    if (res.ok) analysisResult = await res.json();
  } catch (e) { /* offline */ }

  let spokenText = getRecyclingMessage(detection.plasticType);
  if (analysisResult) {
    const gemmaResp = await askGemma(analysisResult);
    if (gemmaResp && gemmaResp.text) spokenText = gemmaResp.text;
  }

  updateKioskDisplay(
    detection.plasticType,
    analysisResult ? analysisResult.reuse_score : '—',
    analysisResult ? analysisResult.verdict : 'UNKNOWN',
    spokenText
  );

  // Step 1: speak the detection result
  await speakAndWait(spokenText);

  // Step 2: ask if user wants to explore more uses
  if (analysisResult) {
    const question = KIOSK_CONFIG.language.startsWith('es')
      ? '¿Te gustaría saber qué otros usos puedes darle a este plástico?'
      : 'Would you like to know what other uses you can give this plastic?';

    updateKioskDisplay(
      detection.plasticType,
      analysisResult.reuse_score,
      analysisResult.verdict,
      question
    );

    await speakAndWait(question);

    // Step 3: listen for yes/no
    listenForYesNo(analysisResult);
  } else {
    kioskResetTimer = setTimeout(() => resetKioskDisplay(), KIOSK_CONFIG.resetDelay);
  }
}

// ---- Continuous scanning (browser) ----
async function scanFrame() {
  if (!kioskActive || isSpeaking || !kioskVideo || kioskVideo.videoWidth === 0) return;
  try {
    kioskCanvas.width = kioskVideo.videoWidth;
    kioskCanvas.height = kioskVideo.videoHeight;
    kioskCanvas.getContext('2d').drawImage(kioskVideo, 0, 0);
    const img = new Image();
    img.src = kioskCanvas.toDataURL('image/jpeg', 0.8);
    await new Promise(r => { img.onload = r; });
    const detection = await analyzeImageWithAI(img);
    console.log('[kiosk scan]', detection);
    if (!detection || detection.confidence < KIOSK_CONFIG.confidenceThreshold * 100) return;
    if (detection.plasticType === lastDetectedType) return;
    await processKioskDetection(detection, img);
  } catch (e) {
    console.warn('Kiosk scan error:', e.message);
  }
}

// ---- Start/Stop kiosk ----
async function startKiosk() {
  kioskActive = true;
  kioskCanvas = document.getElementById('kioskCanvas');

  const kioskSection = document.getElementById('kioskSection');
  if (kioskSection) {
    kioskSection.classList.add('is-open');
    kioskSection.hidden = false;
  }
  document.querySelector('.main-content').style.display = 'none';
  document.querySelector('.app-header').style.display = 'none';

  resetKioskDisplay();
  speak(KIOSK_CONFIG.language.startsWith('es')
    ? 'Sistema de reciclaje inteligente activado. Acerca tu plástico a la cámara.'
    : 'Smart recycling system activated. Hold your plastic in front of the camera.');

  // Use CameraPreview plugin for live feed
  if (window.cordova && window.CameraPreview) {
    // Make WebView transparent so camera shows through
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';
    const box = document.getElementById('kioskCameraBox');
    if (box) box.style.backgroundColor = 'transparent';
    const hint = document.getElementById('kioskCameraHint');
    if (hint) hint.style.display = 'none';

    CameraPreview.startCamera(
      {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: Math.round(window.screen.height * 0.4),
        camera: 'back',
        toBack: true,
        tapPhoto: false,
        previewDrag: false,
      },
      () => {
        console.log('CameraPreview started');
        kioskScanTimer = setInterval(kioskCameraPreviewScan, KIOSK_CONFIG.scanInterval);
      },
      (err) => {
        console.warn('CameraPreview failed:', err);
        // Fallback to native camera captures
        kioskScanTimer = setInterval(captureKioskFrame, 6000);
      }
    );
    return;
  }
  // Cordova: use CameraPreview for live video feed
  if (window.cordova && window.CameraPreview && typeof CameraPreview.startCamera === 'function') {
    const box = document.getElementById('kioskCameraBox');
    const hint = document.getElementById('kioskCameraHint');
    if (hint) hint.style.display = 'none';

    // Make the camera box area transparent so CameraPreview shows through
    if (box) {
      box.style.background = 'transparent';
      box.style.backgroundColor = 'transparent';
    }
    document.body.style.backgroundColor = 'transparent';

    const boxRect = box ? box.getBoundingClientRect() : { left: 0, top: 0, width: window.screen.width, height: Math.round(window.screen.height * 0.4) };

    CameraPreview.startCamera({
      x: Math.round(boxRect.left),
      y: Math.round(boxRect.top),
      width: Math.round(boxRect.width),
      height: Math.round(boxRect.height),
      camera: CameraPreview.CAMERA_DIRECTION ? CameraPreview.CAMERA_DIRECTION.BACK : 'back',
      toBack: true,
      tapPhoto: false,
      previewDrag: false,
      storeToFile: false,
    }, () => {
      console.log('CameraPreview started');
      kioskScanTimer = setInterval(kioskCameraPreviewScan, KIOSK_CONFIG.scanInterval);
    }, (err) => {
      console.warn('CameraPreview failed:', err);
      if (hint) { hint.style.display = ''; hint.textContent = 'Camera error: ' + err; }
    });
    return;
  }

  // Cordova without CameraPreview: use native camera captures
  if (window.cordova && navigator.camera && typeof navigator.camera.getPicture === 'function') {
    const hint = document.getElementById('kioskCameraHint');
    if (hint) hint.textContent = '📷 Auto-scanning...';
    kioskScanTimer = setInterval(captureKioskFrame, KIOSK_CONFIG.scanInterval * 3);
    return;
  }

  try {
    kioskVideo = document.getElementById('kioskVideo');
    const hint = document.getElementById('kioskCameraHint');

    // Must call getUserMedia synchronously within the user gesture context
    const streamPromise = navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: 640, height: 480 }
    });

    // Show section first
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    kioskStream = await streamPromise;
    kioskVideo.srcObject = kioskStream;
    kioskVideo.style.display = 'block';
    if (hint) hint.style.display = 'none';
    kioskVideo.play();

    kioskScanTimer = setInterval(scanFrame, KIOSK_CONFIG.scanInterval);
  } catch (e) {
    console.warn('getUserMedia failed:', e.message);
    const hint = document.getElementById('kioskCameraHint');
    if (hint) hint.textContent = 'Camera error: ' + e.message;
  }
}

function kioskCameraPreviewScan() {
  if (!kioskActive || isSpeaking) return;
  CameraPreview.takeSnapshot({ quality: 70 }, (base64) => {
    const src = 'data:image/jpeg;base64,' + base64;
    // Show snapshot in preview box
    const box = document.getElementById('kioskCameraBox');
    if (box) box.style.backgroundImage = `url(${src})`;

    const img = new Image();
    img.onload = async () => {
      const detection = await analyzeImageWithAI(img);
      if (!detection || detection.confidence < KIOSK_CONFIG.confidenceThreshold * 100) return;
      if (detection.plasticType === lastDetectedType) return;
      await processKioskDetection(detection, img);
    };
    img.src = src;
  });
}

// Cordova camera capture for kiosk
function captureKioskFrame() {
  if (!kioskActive || isSpeaking) return;
  navigator.camera.getPicture(
    (imageData) => {
      const src = 'data:image/jpeg;base64,' + imageData;
      const img = new Image();
      img.onload = async () => {
        // Show preview
        const preview = document.getElementById('kioskPreview');
        if (preview) preview.src = src;

        const detection = await analyzeImageWithAI(img);
        if (!detection || detection.confidence < KIOSK_CONFIG.confidenceThreshold * 100) return;
        if (detection.plasticType === lastDetectedType) return;
        await processKioskDetection(detection, img);
      };
      img.src = src;
    },
    (err) => console.warn('Camera error:', err),
    {
      quality: 70,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640, targetHeight: 480,
      correctOrientation: true,
      saveToPhotoAlbum: false,
    }
  );
}

function stopKiosk() {
  kioskActive = false;
  clearInterval(kioskScanTimer);
  clearTimeout(kioskResetTimer);
  if (window.CameraPreview) { try { CameraPreview.stopCamera(); } catch(e) {} }
  if (kioskStream) { kioskStream.getTracks().forEach(t => t.stop()); kioskStream = null; }
  window.speechSynthesis && window.speechSynthesis.cancel();
  document.body.style.backgroundColor = '';
  document.querySelector('.main-content').style.display = '';
  document.querySelector('.app-header').style.display = '';
  const kioskSection = document.getElementById('kioskSection');
  if (kioskSection) { kioskSection.classList.remove('is-open'); kioskSection.hidden = true; }
  lastDetectedType = null;
}

// ---- Listen for yes/no to start conversation ----
function listenForYesNo(analysisResult) {
  const YES_WORDS = ['sí', 'si', 'yes', 'claro', 'quiero', 'dale', 'ok', 'okay', 'por favor', 'sure'];
  const NO_WORDS  = ['no', 'nope', 'no gracias', 'no thanks'];

  const convText = document.getElementById('kioskDisplay');

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  // Cordova plugin
  if (window.plugins && window.plugins.speechRecognition) {
    window.plugins.speechRecognition.startListening(
      async (matches) => {
        const answer = (matches && matches[0] || '').toLowerCase();
        if (YES_WORDS.some(w => answer.includes(w))) {
          await startVoiceConversation(analysisResult);
        } else {
          kioskResetTimer = setTimeout(() => resetKioskDisplay(), 3000);
        }
      },
      () => { kioskResetTimer = setTimeout(() => resetKioskDisplay(), KIOSK_CONFIG.resetDelay); },
      { language: KIOSK_CONFIG.language, matches: 1, showPopup: false }
    );
    return;
  }

  // Browser Web Speech API
  if (SR) {
    const recognition = new SR();
    recognition.lang = KIOSK_CONFIG.language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = async (event) => {
      const answer = event.results[0][0].transcript.toLowerCase();
      if (YES_WORDS.some(w => answer.includes(w))) {
        await startVoiceConversation(analysisResult);
      } else {
        kioskResetTimer = setTimeout(() => resetKioskDisplay(), 3000);
      }
    };
    recognition.onerror = () => {
      kioskResetTimer = setTimeout(() => resetKioskDisplay(), KIOSK_CONFIG.resetDelay);
    };
    recognition.start();
    // Auto-reset if no answer in 8s
    kioskResetTimer = setTimeout(() => { recognition.stop(); resetKioskDisplay(); }, KIOSK_CONFIG.resetDelay);
    return;
  }

  // No speech recognition available — just reset
  kioskResetTimer = setTimeout(() => resetKioskDisplay(), KIOSK_CONFIG.resetDelay);
}

// ---- Voice Conversation with Gemma ----
let conversationActive = false;
let conversationContext = null; // stores detection + analysis result

async function startVoiceConversation(analysisResult, detectionLabels) {
  if (conversationActive) return;
  conversationActive = true;
  conversationContext = analysisResult;

  // Show conversation UI
  const display = document.getElementById('kioskDisplay');
  if (display) {
    display.innerHTML = `
      <div class="kiosk-conversation">
        <div class="kiosk-conv-icon">🎙️</div>
        <div id="kioskConvText" class="kiosk-conv-text">Escuchando...</div>
        <div id="kioskConvHistory" class="kiosk-conv-history"></div>
        <button class="btn btn-ghost btn-sm" onclick="endVoiceConversation()">✕ Terminar</button>
      </div>
    `;
  }

  // Initial Gemma greeting
  const type = analysisResult.request_summary.plastic_type;
  const score = analysisResult.reuse_score;
  const greeting = KIOSK_CONFIG.language.startsWith('es')
    ? `Perfecto. Cuéntame, ¿qué tienes en mente para este ${type}? Puedo sugerirte ideas para manualidades, construcción, jardín o arte.`
    : `Great! Tell me, what do you have in mind for this ${type}? I can suggest ideas for crafts, construction, gardening, or art.`;

  addConvMessage('assistant', greeting);
  await speakAndWait(greeting);
  listenForUserInput();
}

function addConvMessage(role, text) {
  const history = document.getElementById('kioskConvHistory');
  if (!history) return;
  const div = document.createElement('div');
  div.className = `conv-msg conv-${role}`;
  div.textContent = (role === 'user' ? '👤 ' : '🤖 ') + text;
  history.appendChild(div);
  history.scrollTop = history.scrollHeight;
}

function speakAndWait(text) {
  return new Promise((resolve) => {
    isSpeaking = true;
    if (window.TTS) {
      TTS.speak({ text, locale: KIOSK_CONFIG.language, rate: 0.9 },
        () => { isSpeaking = false; resolve(); },
        () => { isSpeaking = false; resolve(); }
      );
    } else if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = KIOSK_CONFIG.language;
      utt.rate = 0.9;
      utt.onend = () => { isSpeaking = false; resolve(); };
      utt.onerror = () => { isSpeaking = false; resolve(); };
      window.speechSynthesis.speak(utt);
    } else {
      isSpeaking = false;
      resolve();
    }
  });
}

function listenForUserInput() {
  if (!conversationActive) return;

  const convText = document.getElementById('kioskConvText');
  if (convText) convText.textContent = '🎙️ Habla ahora...';

  // Use SpeechRecognition plugin if available
  if (window.SpeechRecognition || window.webkitSpeechRecognition || window.plugins?.speechRecognition) {
    listenNative();
  } else if (window.cordova && window.plugins && window.plugins.speechRecognition) {
    listenCordova();
  } else {
    // Browser Web Speech API
    listenBrowser();
  }
}

function listenBrowser() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    const convText = document.getElementById('kioskConvText');
    if (convText) convText.textContent = 'Voz no disponible en este dispositivo';
    return;
  }
  const recognition = new SR();
  recognition.lang = KIOSK_CONFIG.language;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    await processUserInput(transcript);
  };
  recognition.onerror = () => {
    if (conversationActive) listenForUserInput();
  };
  recognition.onend = () => {};
  recognition.start();
}

function listenCordova() {
  window.plugins.speechRecognition.startListening(
    async (matches) => {
      if (matches && matches.length > 0) {
        await processUserInput(matches[0]);
      } else if (conversationActive) {
        listenForUserInput();
      }
    },
    () => { if (conversationActive) listenForUserInput(); },
    { language: KIOSK_CONFIG.language, matches: 1, showPopup: false }
  );
}

function listenNative() {
  // Try Cordova plugin first, fallback to browser
  if (window.plugins && window.plugins.speechRecognition) {
    listenCordova();
  } else {
    listenBrowser();
  }
}

async function processUserInput(transcript) {
  if (!conversationActive || !conversationContext) return;

  const convText = document.getElementById('kioskConvText');
  if (convText) convText.textContent = `Tú: "${transcript}"`;
  addConvMessage('user', transcript);

  // Build prompt with context
  const r = conversationContext;
  const prompt = `<start_of_turn>user
Eres un experto en reciclaje y reutilización de plásticos instalado en una caneca inteligente.
El plástico detectado es: ${r.request_summary.plastic_type} (score: ${r.reuse_score}/100, veredicto: ${r.verdict}).
Proceso sugerido: ${r.suggested_process.join(' → ')}.
Advertencias: ${r.warnings.slice(0,2).join('; ')}.

El usuario pregunta: "${transcript}"

Responde en español, de forma breve (máximo 3 oraciones), práctica y amigable. 
Si el usuario quiere saber usos específicos, sugiere 2-3 ideas concretas.
<end_of_turn>
<start_of_turn>model
`;

  if (convText) convText.textContent = '🤔 Pensando...';

  // Get Gemma response
  const response = await askGemma(conversationContext, transcript);
  const responseText = response ? response.text : buildFallbackResponse(conversationContext, transcript);

  addConvMessage('assistant', responseText);
  await speakAndWait(responseText);

  // Continue listening
  if (conversationActive) {
    setTimeout(() => listenForUserInput(), 500);
  }
}

function endVoiceConversation() {
  conversationActive = false;
  conversationContext = null;
  if (window.TTS) TTS.stop();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  resetKioskDisplay();
}
