/**
 * Kiosk Mode — Plastic Reuse Engine
 * Continuous camera detection for recycling bin installation.
 * Auto-detects plastic, speaks result via TTS, resets after timeout.
 */

const KIOSK_CONFIG = {
  scanInterval: 300,            // scan every 300ms (~3 fps inference, video runs at 30fps)
  confidenceThreshold: 0.08,
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

// ---- Object Detection with Bounding Boxes ----
let detectorModel = null;
let lastPredictions = []; // store last predictions to draw continuously
let inferenceRunning = false;

// Plastic-relevant COCO classes and their plastic type mapping
const COCO_TO_PLASTIC = {
  'bottle':        { plastic: 'PET',  color: '#00e5ff' },
  'cup':           { plastic: 'PP',   color: '#69ff47' },
  'bowl':          { plastic: 'PP',   color: '#69ff47' },
  'wine glass':    { plastic: 'PET',  color: '#00e5ff' },
  'vase':          { plastic: 'PET',  color: '#00e5ff' },
  'handbag':       { plastic: 'LDPE', color: '#ff9100' },
  'backpack':      { plastic: 'LDPE', color: '#ff9100' },
  'suitcase':      { plastic: 'HDPE', color: '#ff4081' },
  'scissors':      { plastic: 'PP',   color: '#69ff47' },
  'toothbrush':    { plastic: 'PP',   color: '#69ff47' },
  'remote':        { plastic: 'OTHER', color: '#e040fb' },
  'cell phone':    { plastic: 'OTHER', color: '#e040fb' },
  'keyboard':      { plastic: 'OTHER', color: '#e040fb' },
  'umbrella':      { plastic: 'LDPE', color: '#ff9100' },
  'frisbee':       { plastic: 'HDPE', color: '#ff4081' },
  'sports ball':   { plastic: 'PP',   color: '#69ff47' },
};

async function loadDetector() {
  if (detectorModel) return detectorModel;
  try {
    detectorModel = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
    console.log('COCO-SSD detector ready');
  } catch (e) {
    console.warn('COCO-SSD failed:', e.message);
  }
  return detectorModel;
}

// Canvas is TRANSPARENT and floats on top of the camera feed.
// Event-driven: only redraws when markOverlayDirty() is called.
// NO continuous requestAnimationFrame loop - eliminates compositor thrash on Android.
let _overlayCanvas = null;
let _overlayVideo  = null;
let _overlayDirty  = false;
let _overlayPending = false;

function markOverlayDirty() {
  _overlayDirty = true;
  if (!_overlayPending) {
    _overlayPending = true;
    requestAnimationFrame(_drawOverlay);
  }
}

function _drawOverlay() {
  _overlayPending = false;
  if (!_overlayCanvas) return;

  const canvas = _overlayCanvas;
  const video  = _overlayVideo;
  const ctx    = canvas.getContext('2d');

  // Sync canvas size to CSS display size
  const dw = canvas.parentElement ? canvas.parentElement.offsetWidth  : canvas.offsetWidth;
  const dh = canvas.parentElement ? canvas.parentElement.offsetHeight : canvas.offsetHeight;
  if (dw > 0 && canvas.width  !== dw) canvas.width  = dw;
  if (dh > 0 && canvas.height !== dh) canvas.height = dh;

  // Clear to fully transparent
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (lastPredictions.length > 0) {
    // For CameraPreview path, video dimensions come from snapshot size instead
    const vw = (video && video.videoWidth)  ? video.videoWidth  : canvas.width;
    const vh = (video && video.videoHeight) ? video.videoHeight : canvas.height;
    const scaleX = canvas.width  / vw;
    const scaleY = canvas.height / vh;

    lastPredictions.forEach(pred => {
      const map       = COCO_TO_PLASTIC[pred.class];
      const isPlastic = !!map;
      const color     = isPlastic ? map.color : 'rgba(255,255,255,0.2)';
      const pct       = Math.round(pred.score * 100);
      const [x, y, w, h] = pred.bbox;
      const sx = x * scaleX, sy = y * scaleY;
      const sw = w * scaleX, sh = h * scaleY;

      ctx.strokeStyle = color;
      ctx.lineWidth   = isPlastic ? 4 : 1;
      ctx.strokeRect(sx, sy, sw, sh);

      if (isPlastic) {
        const label = '\u267B ' + map.plastic + ': ' + pct + '%';
        ctx.font = 'bold 15px Arial';
        const tw = ctx.measureText(label).width + 14;
        const ly = sy > 32 ? sy - 32 : sy + sh + 4;
        ctx.fillStyle = color;
        ctx.fillRect(sx, ly, tw, 28);
        ctx.fillStyle = '#000';
        ctx.fillText(label, sx + 7, ly + 20);
      }
    });
  }

  _overlayDirty = false;
}

function startOverlayLoop(video, canvas) {
  // Store refs; no RAF loop needed - drawing is event-driven via markOverlayDirty()
  _overlayCanvas = canvas;
  _overlayVideo  = video;
  // Initial clear
  markOverlayDirty();
}


// Inference loop — runs every scanInterval ms without blocking the video draw loop
function startInferenceLoop(video) {
  async function inferLoop() {
    if (!kioskActive) return;

    // Run inference regardless of speaking — we still want to update bounding boxes
    if (!inferenceRunning && video.readyState >= 2 && video.videoWidth > 0) {
      inferenceRunning = true;
      try {
        const detector = await loadDetector();
        if (detector) {
          const preds = await detector.detect(video, undefined, KIOSK_CONFIG.confidenceThreshold);
          lastPredictions = preds || [];
          markOverlayDirty(); // signal canvas to redraw bounding boxes

          // Only trigger full processKioskDetection when not currently processing
          // and user is not already in a TTS interaction
          if (!isProcessing && !isSpeaking && lastPredictions.length > 0) {
            const plasticPreds = lastPredictions.filter(p => COCO_TO_PLASTIC[p.class]);
            if (plasticPreds.length > 0) {
              const best = plasticPreds.sort((a, b) => b.score - a.score)[0];
              const conf = Math.round(best.score * 100);
              if (conf >= KIOSK_CONFIG.confidenceThreshold * 100 && best.class !== lastDetectedType) {
                const map = COCO_TO_PLASTIC[best.class];
                const detection = {
                  plasticType: map.plastic,
                  sourceType: best.class === 'bottle' ? 'bottle' : best.class === 'cup' ? 'food_container' : 'other',
                  confidence: conf,
                  labels: lastPredictions.slice(0, 3).map(p => {
                    const m = COCO_TO_PLASTIC[p.class];
                    return `${m ? m.plastic : p.class} (${Math.round(p.score * 100)}%)`;
                  }).join(', '),
                  contamination: 'low',
                  washable: 'unknown',
                };
                // Fire and forget — inference loop keeps running
                processKioskDetection(detection, null);
              }
            }
          }
        }
      } catch (e) {
        console.warn('Inference error:', e.message);
      } finally {
        inferenceRunning = false;
      }
    }

    setTimeout(inferLoop, KIOSK_CONFIG.scanInterval);
  }

  setTimeout(inferLoop, 500); // short delay to let video settle
}
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
let isProcessing = false;

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

// ---- Continuous scanning (browser) — kept for legacy CameraPreview path ----
// NOTE: For getUserMedia (browser/WebView), detection is handled by startInferenceLoop.
// This function is only called from the CameraPreview snapshot path.
async function scanFrame() {
  if (!kioskActive || isProcessing) return;
  if (!kioskVideo || kioskVideo.videoWidth === 0) return;

  // Directly use the already-loaded COCO-SSD detector
  const detector = await loadDetector();
  if (!detector) return;

  isProcessing = true;
  try {
    const preds = await detector.detect(kioskVideo, undefined, 0.25);
    lastPredictions = preds || [];

    if (isSpeaking) { isProcessing = false; return; } // don't interrupt TTS

    const plasticPreds = lastPredictions.filter(p => COCO_TO_PLASTIC[p.class]);
    if (plasticPreds.length === 0) { isProcessing = false; return; }

    const best = plasticPreds.sort((a, b) => b.score - a.score)[0];
    const conf = Math.round(best.score * 100);
    if (conf < KIOSK_CONFIG.confidenceThreshold * 100 || best.class === lastDetectedType) {
      isProcessing = false;
      return;
    }

    const map = COCO_TO_PLASTIC[best.class];
    const detection = {
      plasticType: map.plastic,
      sourceType: best.class === 'bottle' ? 'bottle' : best.class === 'cup' ? 'food_container' : 'other',
      confidence: conf,
      labels: lastPredictions.slice(0, 3).map(p => {
        const m = COCO_TO_PLASTIC[p.class];
        return `${m ? m.plastic : p.class} (${Math.round(p.score * 100)}%)`;
      }).join(', '),
      contamination: 'low',
      washable: 'unknown',
    };
    console.log('[kiosk scan]', detection);
    await processKioskDetection(detection, null);
  } catch (e) {
    console.warn('Kiosk scan error:', e.message);
  } finally {
    isProcessing = false;
  }
}

// ---- Debug badge (visible on screen, no logcat needed) ----
function setDebugBadge(msg) {
  const b = document.getElementById('kioskDebugBadge');
  if (!b) return;
  b.textContent = msg;
  b.style.display = 'block';
}

// ---- Start/Stop kiosk ----
async function startKiosk() {
  if (kioskActive) return; // ya activo
  kioskActive = true;
  kioskCanvas = document.getElementById('kioskCanvas');

  const kioskSection = document.getElementById('kioskSection');
  if (kioskSection) {
    kioskSection.classList.add('is-open');
    kioskSection.hidden = false;
  }
  // Ocultar el menú de análisis manual si estaba visible
  const mainContent = document.querySelector('.main-content');
  const appHeader   = document.querySelector('.app-header');
  if (mainContent) mainContent.style.display = 'none';
  if (appHeader)   appHeader.style.display   = 'none';

  resetKioskDisplay();
  speak(KIOSK_CONFIG.language.startsWith('es')
    ? 'Sistema de reciclaje inteligente activado. Acerca tu plástico a la cámara.'
    : 'Smart recycling system activated. Hold your plastic in front of the camera.');

  // Preload AI model before scanning starts
  if (typeof loadModel    === 'function') loadModel().catch(() => {});
  if (typeof loadDetector === 'function') loadDetector().catch(() => {});

  // Register the overlay canvas refs for event-driven drawing
  _overlayCanvas = document.getElementById('kioskOverlay');
  _overlayVideo  = null; // set per-path below

  if (window.cordova && window.CameraPreview) {
    startKioskCameraPreview();
    return;
  }
  startKioskGetUserMedia();
}

// ── CameraPreview toBack:true ──
// Cámara 30fps NATIVA detrás del WebView (transparente).
// Canvas = overlay 100% transparente que SOLO dibuja bboxes.
// Snapshots = únicamente para inferencia COCO-SSD, NUNCA al canvas.
function startKioskCameraPreview() {
  const box  = document.getElementById('kioskCameraBox');
  const hint = document.getElementById('kioskCameraHint');
  if (hint) hint.style.display = 'none';

  // Toda la cadena CSS debe ser transparente
  document.body.style.backgroundColor              = 'transparent';
  document.documentElement.style.backgroundColor   = 'transparent';
  if (box) box.style.cssText += ';background:transparent!important;';

  const rect = box ? box.getBoundingClientRect()
    : { left: 0, top: 0, width: window.screen.width, height: Math.round(window.screen.height * 0.4) };

  setDebugBadge('CAM opening...');

  CameraPreview.startCamera({
    x:           Math.round(rect.left),
    y:           Math.round(rect.top),
    width:       Math.round(rect.width),
    height:      Math.round(rect.height),
    camera:      _currentCamera,
    toBack:      true,   // ← cámara DETRÁS del WebView
    tapPhoto:    false,
    previewDrag: false,
    storeToFile: false,
  }, () => {
    setDebugBadge('CAM OK \u267b 30fps');
    // Inferencia cada 400ms — la cámara sigue a 30fps nativa sin este timer
    kioskScanTimer = setInterval(kioskInferenceTick, 400);
  }, (err) => {
    setDebugBadge('CAM ERR: ' + err);
    if (hint) { hint.style.display = ''; hint.querySelector('span').textContent = 'Error: ' + err; }
  });
}

// Dimensiones del último snapshot (para escalar bboxes correctamente)
let _lastImgW = 1, _lastImgH = 1;
let _inferBusy = false;

// Toma un snapshot SOLO para inferencia. Canvas limpio → solo bboxes.
function kioskInferenceTick() {
  if (!kioskActive || _inferBusy) return;
  _inferBusy = true;

  CameraPreview.takeSnapshot({ quality: 60 }, (b64) => {
    const img = new Image();
    img.onload = () => {
      _lastImgW = img.width  || 1;
      _lastImgH = img.height || 1;

      loadDetector().then(detector => {
        if (!detector) { _inferBusy = false; return; }

        return detector.detect(img, undefined, KIOSK_CONFIG.confidenceThreshold)
          .then(preds => {
            lastPredictions = preds || [];
            // Redibujar canvas: clear + bboxes (sin imagen de fondo)
            _redrawOverlayBboxes();

            // TTS y resultado si hay plástico nuevo
            if (!isProcessing && !isSpeaking && lastPredictions.length > 0) {
              const plasticPreds = lastPredictions.filter(p => COCO_TO_PLASTIC[p.class]);
              if (plasticPreds.length > 0) {
                const best = plasticPreds.sort((a, b) => b.score - a.score)[0];
                const conf = Math.round(best.score * 100);
                if (conf >= KIOSK_CONFIG.confidenceThreshold * 100 && best.class !== lastDetectedType) {
                  const map = COCO_TO_PLASTIC[best.class];
                  processKioskDetection({
                    plasticType:   map.plastic,
                    sourceType:    best.class === 'bottle' ? 'bottle' : 'other',
                    confidence:    conf,
                    labels:        lastPredictions.slice(0, 3).map(p => {
                      const m = COCO_TO_PLASTIC[p.class];
                      return (m ? m.plastic : p.class) + ' (' + Math.round(p.score * 100) + '%)';
                    }).join(', '),
                    contamination: 'low',
                    washable:      'unknown',
                  }, null);
                }
              }
            }
          })
          .catch(() => {})
          .finally(() => { _inferBusy = false; });
      }).catch(() => { _inferBusy = false; });
    };
    img.onerror = () => { _inferBusy = false; };
    img.src = 'data:image/jpeg;base64,' + b64;
  }, () => { _inferBusy = false; });
}

// Redibuja el canvas con fondo TRANSPARENTE + bboxes escalados
function _redrawOverlayBboxes() {
  const canvas = _overlayCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Ajustar tamaño canvas a su contenedor
  const parent = canvas.parentElement;
  if (parent) {
    if (canvas.width  !== parent.offsetWidth)  canvas.width  = parent.offsetWidth;
    if (canvas.height !== parent.offsetHeight) canvas.height = parent.offsetHeight;
  }

  // Limpiar completamente (transparente) — la cámara nativa muestra debajo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar bboxes
  if (lastPredictions.length > 0) {
    _drawBboxes(ctx, canvas.width, canvas.height, _lastImgW, _lastImgH);
  }
}

// Dibuja bboxes con etiquetas premium sobre el canvas
function _drawBboxes(ctx, cw, ch, iw, ih) {
  if (!lastPredictions.length) return;
  const sx = cw / iw;
  const sy = ch / ih;

  lastPredictions.forEach(pred => {
    const map = COCO_TO_PLASTIC[pred.class];

    // Solo mostrar cajas para plásticos confirmados (sin ruido de otros objetos)
    if (!map) return;

    const color = map.color || '#00e676';
    const pct   = Math.round(pred.score * 100);
    const [x, y, w, h] = pred.bbox;

    // Coordenadas en canvas
    const bx = x * sx;
    const by = y * sy;
    const bw = w * sx;
    const bh = h * sy;

    // ── 1. Caja con borde grueso y esquinas marcadas ──
    ctx.strokeStyle = color;
    ctx.lineWidth   = 3;
    ctx.strokeRect(bx, by, bw, bh);

    // Esquinas decorativas (L-shapes) para estilo de visor
    const cs = Math.min(bw, bh, 28); // corner size
    ctx.lineWidth = 5;
    const corners = [
      [bx, by, bx + cs, by, bx, by + cs],
      [bx + bw, by, bx + bw - cs, by, bx + bw, by + cs],
      [bx, by + bh, bx + cs, by + bh, bx, by + bh - cs],
      [bx + bw, by + bh, bx + bw - cs, by + bh, bx + bw, by + bh - cs],
    ];
    corners.forEach(([mx, my, lx1, ly1, lx2, ly2]) => {
      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(mx, my);
      ctx.lineTo(lx2, ly2);
      ctx.stroke();
    });

    // ── 2. Etiqueta siempre DENTRO de la caja (esquina superior izquierda) ──
    const label   = '\u267B ' + map.plastic + '  ' + pct + '%';
    const fsize   = Math.max(14, Math.min(22, Math.round(bw / 8))); // responsive font
    ctx.font      = 'bold ' + fsize + 'px Arial';
    const tw      = ctx.measureText(label).width;
    const padding = 8;
    const lh      = fsize + padding * 2;   // label height
    const lw      = tw + padding * 2;      // label width
    // Posición: dentro de la caja, arriba a la izquierda
    const lx = bx;
    const ly = by;

    // Fondo semi-transparente de la etiqueta
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.88;
    ctx.fillRect(lx, ly, lw, lh);
    ctx.globalAlpha = 1.0;

    // Texto blanco con sombra para legibilidad
    ctx.shadowColor   = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur    = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, lx + padding, ly + fsize + padding * 0.6);

    // Reset shadow
    ctx.shadowColor   = 'transparent';
    ctx.shadowBlur    = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  });
}






// getUserMedia — renderiza en el compositor GPU del WebView Android (30fps nativo)
async function startKioskGetUserMedia() {
  kioskVideo = document.getElementById('kioskVideo');
  const hint = document.getElementById('kioskCameraHint');
  const box  = document.getElementById('kioskCameraBox');

  // Restore black background while camera loads
  if (box) box.style.background = '#000';

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setDebugBadge('NO getUserMedia');
    if (hint) { hint.style.display = ''; hint.querySelector('span').textContent = 'Camara no disponible en este dispositivo'; }
    return;
  }

  try {
    setDebugBadge('getUserMedia iniciando...');

    // Try 720p back camera; browser picks best match
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode:  { ideal: 'environment' },
        width:       { ideal: 1280 },
        height:      { ideal: 720 },
      },
      audio: false,
    });

    const track    = stream.getVideoTracks()[0];
    const settings = track ? track.getSettings() : {};
    setDebugBadge('VIDEO ' + (settings.width || '?') + 'x' + (settings.height || '?') + ' @' + Math.round(settings.frameRate || 0) + 'fps');

    _overlayVideo    = kioskVideo;
    kioskStream      = stream;
    kioskVideo.srcObject = stream;
    kioskVideo.setAttribute('playsinline', '');
    kioskVideo.setAttribute('muted', '');
    kioskVideo.muted = true;
    if (box) box.style.background = 'transparent'; // camera takes over
    kioskVideo.style.display = 'block';
    if (hint) hint.style.display = 'none';
    await kioskVideo.play();

    startOverlayLoop(kioskVideo, document.getElementById('kioskOverlay'));
    startInferenceLoop(kioskVideo);
  } catch (e) {
    console.warn('[kiosk] getUserMedia failed:', e.name, e.message);
    setDebugBadge('ERROR: ' + e.name);
    if (hint) {
      hint.style.display = '';
      const span = hint.querySelector('span');
      if (span) span.textContent = e.name === 'NotAllowedError'
        ? 'Permiso de camara denegado'
        : 'Error de camara: ' + e.message;
    }

  }
}


// kioskCameraPreviewScan — called on interval for AI inference ONLY.
// The live camera feed is shown NATIVELY behind the WebView (toBack:true).
// We never set backgroundImage here — that was causing the 'slow screenshot' effect.
let _previewInference = false;
function kioskCameraPreviewScan() {
  if (!kioskActive || _previewInference) return;
  _previewInference = true;

  CameraPreview.takeSnapshot({ quality: 60 }, async (base64) => {
    try {
      // Draw the snapshot into an offscreen canvas so COCO-SSD can read it
      const img = new Image();
      img.onload = async () => {
        // Draw onto the overlay canvas for COCO-SSD bounding boxes
        const overlay = document.getElementById('kioskOverlay');
        if (overlay && overlay.width > 0) {
          // Run COCO-SSD directly on the image
          const detector = await loadDetector();
          if (detector) {
            const preds = await detector.detect(img, undefined, KIOSK_CONFIG.confidenceThreshold);
            lastPredictions = preds || [];
            markOverlayDirty();

            if (!isProcessing && !isSpeaking && lastPredictions.length > 0) {
              const plasticPreds = lastPredictions.filter(p => COCO_TO_PLASTIC[p.class]);
              if (plasticPreds.length > 0) {
                const best = plasticPreds.sort((a, b) => b.score - a.score)[0];
                const conf = Math.round(best.score * 100);
                if (conf >= KIOSK_CONFIG.confidenceThreshold * 100 && best.class !== lastDetectedType) {
                  const map = COCO_TO_PLASTIC[best.class];
                  processKioskDetection({
                    plasticType: map.plastic,
                    sourceType: best.class === 'bottle' ? 'bottle' : best.class === 'cup' ? 'food_container' : 'other',
                    confidence: conf,
                    labels: lastPredictions.slice(0, 3).map(p => {
                      const m = COCO_TO_PLASTIC[p.class];
                      return (m ? m.plastic : p.class) + ' (' + Math.round(p.score * 100) + '%)';
                    }).join(', '),
                    contamination: 'low',
                    washable: 'unknown',
                  }, null);
                }
              }
            }
          }
        }
        _previewInference = false;
      };
      img.onerror = () => { _previewInference = false; };
      img.src = 'data:image/jpeg;base64,' + base64;
    } catch (e) {
      console.warn('[kiosk] snapshot inference error:', e.message);
      _previewInference = false;
    }
  }, () => { _previewInference = false; });
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
  _snapBusy   = false;
  _inferBusy  = false;
  clearInterval(kioskScanTimer);
  clearTimeout(kioskResetTimer);
  if (window.CameraPreview) { try { CameraPreview.stopCamera(); } catch(e) {} }
  if (kioskStream) { kioskStream.getTracks().forEach(t => t.stop()); kioskStream = null; }
  if (kioskVideo) { kioskVideo.srcObject = null; kioskVideo.style.display = 'none'; }
  _overlayCanvas = null; _overlayVideo = null;
  lastPredictions = [];
  window.speechSynthesis && window.speechSynthesis.cancel();
  document.body.style.backgroundColor = '';

  // Mostrar el menú de análisis manual
  const mainContent = document.querySelector('.main-content');
  const appHeader   = document.querySelector('.app-header');
  if (mainContent) mainContent.style.display = '';
  if (appHeader)   appHeader.style.display   = '';

  // Ocultar sección kiosk
  const kioskSection = document.getElementById('kioskSection');
  if (kioskSection) { kioskSection.classList.remove('is-open'); kioskSection.hidden = true; }
  lastDetectedType = null;
}

// ---- Flip camera (trasera ↔ frontal) ----
let _currentCamera = 'back';

function flipCamera() {
  if (!kioskActive || !window.CameraPreview) return;

  // Animación del botón
  const btn = document.getElementById('kioskFlipBtn');
  if (btn) {
    btn.style.transition = 'transform 0.3s';
    btn.style.transform  = 'rotate(180deg)';
    setTimeout(() => { btn.style.transform = ''; }, 350);
  }

  // Detener inferencia temporalmente
  clearInterval(kioskScanTimer);
  _inferBusy = false;
  lastPredictions = [];

  // Limpiar canvas overlay
  if (_overlayCanvas) {
    const ctx = _overlayCanvas.getContext('2d');
    ctx.clearRect(0, 0, _overlayCanvas.width, _overlayCanvas.height);
  }

  // Cambiar cámara
  _currentCamera = _currentCamera === 'back' ? 'front' : 'back';

  CameraPreview.stopCamera(() => {
    // Pequeña pausa para que el hardware libere la cámara
    setTimeout(() => {
      if (!kioskActive) return;

      const box  = document.getElementById('kioskCameraBox');
      const rect = box ? box.getBoundingClientRect()
        : { left: 0, top: 0, width: window.screen.width, height: Math.round(window.screen.height * 0.4) };

      setDebugBadge('CAM ' + _currentCamera + '...');

      CameraPreview.startCamera({
        x:           Math.round(rect.left),
        y:           Math.round(rect.top),
        width:       Math.round(rect.width),
        height:      Math.round(rect.height),
        camera:      _currentCamera,
        toBack:      true,
        tapPhoto:    false,
        previewDrag: false,
        storeToFile: false,
      }, () => {
        setDebugBadge('CAM ' + _currentCamera + ' OK ♻');
        kioskScanTimer = setInterval(kioskInferenceTick, 400);
      }, (err) => {
        setDebugBadge('CAM ERR: ' + err);
        // Revertir si la frontal falla
        _currentCamera = _currentCamera === 'back' ? 'front' : 'back';
      });
    }, 300);
  }, () => {
    // stopCamera falló — intentar reinicio directo
    setTimeout(() => { if (kioskActive) kioskScanTimer = setInterval(kioskInferenceTick, 400); }, 500);
  });
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

  // En Android Cordova SIEMPRE usar el plugin nativo
  if (window.cordova && window.plugins && window.plugins.speechRecognition) {
    _requestMicThenListen();
  } else {
    listenBrowser();
  }
}

// Solicita permiso de mic y luego inicia el reconocimiento
function _requestMicThenListen() {
  window.plugins.speechRecognition.requestPermission(
    () => {
      // Permiso concedido — iniciar escucha
      listenCordova();
    },
    (err) => {
      const convText = document.getElementById('kioskConvText');
      if (convText) convText.textContent = '⚠️ Permiso de micrófono denegado. Ve a Ajustes > Permisos.';
      console.warn('[VoiceAsk] Mic permission denied:', err);
    }
  );
}

function listenBrowser() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    const convText = document.getElementById('kioskConvText');
    if (convText) convText.textContent = '⚠️ Reconocimiento de voz no disponible';
    return;
  }
  const recognition = new SR();
  recognition.lang = KIOSK_CONFIG.language;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    await processUserInput(transcript);
  };
  recognition.onerror = (e) => {
    const convText = document.getElementById('kioskConvText');
    const msg = e.error === 'not-allowed'
      ? '⚠️ Permiso de micrófono denegado'
      : e.error === 'no-speech'
        ? 'No escuché nada. Toca Preguntar de nuevo.'
        : '⚠️ Error: ' + e.error;
    if (convText) convText.textContent = msg;
    // No volver a escuchar automáticamente en error
  };
  recognition.onend = () => {};
  try { recognition.start(); } catch(e) { console.warn('STT start error:', e); }
}

function listenCordova() {
  const convText = document.getElementById('kioskConvText');
  if (convText) convText.textContent = '🎙️ Escuchando...';

  window.plugins.speechRecognition.startListening(
    async (matches) => {
      if (matches && matches.length > 0 && matches[0].trim()) {
        await processUserInput(matches[0].trim());
      } else {
        if (convText) convText.textContent = 'No escuché nada. Intenta de nuevo.';
        if (conversationActive) setTimeout(() => listenForUserInput(), 1500);
      }
    },
    (err) => {
      console.warn('[VoiceAsk] listenCordova error:', err);
      if (convText) convText.textContent = 'Error de micrófono: ' + (err || 'desconocido');
      if (conversationActive) setTimeout(() => listenForUserInput(), 2000);
    },
    {
      language: KIOSK_CONFIG.language,
      matches: 1,
      showPopup: false,
      prompt: 'Habla ahora sobre el plástico',
      showPartial: false,
    }
  );
}

function listenNative() {
  listenForUserInput(); // unificado
}

async function processUserInput(transcript) {
  if (!conversationActive) return;

  const convText = document.getElementById('kioskConvText');
  if (convText) convText.textContent = `Tú: "${transcript}"`;
  addConvMessage('user', transcript);

  // Construir contexto: usar conversationContext si existe, o contexto sintético
  const ctx = conversationContext || {
    request_summary: {
      plastic_type: lastDetectedType || 'plástico',
      source_type: 'other',
      contamination_level: 'low',
      washable: 'unknown',
    },
    reuse_score: '—',
    verdict: 'CONDITIONAL_REUSE',
    reasons: ['Identificado visualmente'],
    warnings: ['Sin análisis completo'],
    suggested_process: ['Limpiar', 'Clasificar', 'Reciclar'],
    disclaimer: 'Resultado estimado.',
  };

  if (convText) convText.textContent = '🤔 Pensando...';

  const response = await askGemma(ctx, transcript);
  const responseText = response ? response.text : buildFallbackResponse(ctx, transcript);

  addConvMessage('assistant', responseText);
  await speakAndWait(responseText);

  if (conversationActive) {
    setTimeout(() => listenForUserInput(), 600);
  }
}

function endVoiceConversation() {
  conversationActive = false;
  conversationContext = null;
  if (window.TTS) TTS.stop();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  resetKioskDisplay();
}

// ================================================================
//  startKioskAsk() — Botón "Preguntar" del header del kiosk
//  Abre la conversación por voz desde el kiosk, con o sin detección previa
// ================================================================
function startKioskAsk() {
  // Si ya hay una conversación activa, no hacer nada
  if (conversationActive) return;

  // ── Caso 1: hay un resultado de análisis del backend ──
  if (conversationContext) {
    startVoiceConversation(conversationContext);
    return;
  }

  // ── Caso 2: hay un tipo detectado por COCO-SSD, sin resultado de backend ──
  if (lastDetectedType) {
    const syntheticResult = {
      request_summary: {
        plastic_type: lastDetectedType,
        source_type: 'other',
        contamination_level: 'low',
        washable: 'unknown',
        intended_reuse: 'experimental_prototype',
      },
      reuse_score: '—',
      verdict: 'CONDITIONAL_REUSE',
      reasons: ['Identificado visualmente por cámara'],
      warnings: ['Clasificación estimada, no verificada'],
      suggested_process: ['Limpiar', 'Clasificar', 'Reciclar o reutilizar'],
      disclaimer: 'Resultado estimado sin análisis completo.',
    };
    startVoiceConversation(syntheticResult);
    return;
  }

  // ── Caso 3: sin detección aún — modo asesor general de reciclaje ──
  conversationActive = true;

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

  const greeting = KIOSK_CONFIG.language.startsWith('es')
    ? '¡Hola! Soy tu asistente de reciclaje. Acerca un plástico a la cámara para analizarlo, o pregúntame cualquier duda sobre reciclaje.'
    : 'Hello! I am your recycling assistant. Hold a plastic item in front of the camera, or ask me any recycling question.';

  addConvMessage('assistant', greeting);
  speakAndWait(greeting).then(() => {
    if (conversationActive) listenForUserInput();
  });
}

// ================================================================
//  Auto-inicio del kiosk al arrancar la app
// ================================================================
function _autoStartKiosk() {
  // La sección ya tiene class="is-open" en el HTML,
  // pero necesitamos activar la cámara y la IA.
  startKiosk();
}

// Cordova: espera a que los plugins estén listos
document.addEventListener('deviceready', _autoStartKiosk, false);

// Navegador (preview / desarrollo): arranca directamente
if (!window.cordova) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(_autoStartKiosk, 200));
  } else {
    setTimeout(_autoStartKiosk, 200);
  }
}
