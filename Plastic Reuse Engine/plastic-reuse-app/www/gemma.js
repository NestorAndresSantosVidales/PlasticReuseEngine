/**
 * Gemma 2B Local Inference — Plastic Reuse Engine
 * Uses native GemmaPlugin (MediaPipe) with streaming.
 * Falls back to rule-based responses when model not available.
 */

let gemmaReady = false;

const SYSTEM_PROMPT = `Eres un experto en reciclaje y reutilización de plásticos en la app Plastic Reuse Engine.
Ayuda al usuario a entender cómo reutilizar el plástico detectado de forma segura y creativa.
Responde SIEMPRE en español, de forma breve (máximo 3 oraciones), práctica y amigable.
Prioriza la seguridad. Si el usuario pregunta algo fuera de reciclaje, redirige amablemente al tema.`;

// ---- Initialize ----
async function initGemma() {
  if (gemmaReady) return true;
  if (!window.cordova || !window.GemmaPlugin) return false;
  return new Promise((resolve) => {
    GemmaPlugin.initialize(
      () => { gemmaReady = true; console.log('Gemma ready'); resolve(true); },
      (err) => {
        if (err && err.includes('MODEL_NOT_FOUND')) {
      showModelDownloadBanner(err.split(':')[1] || '');
    }
        console.warn('Gemma init failed:', err);
        resolve(false);
      }
    );
  });
}

function showModelDownloadBanner(path) {
  const b = document.getElementById('gemmaDownloadBanner');
  if (!b) return;
  b.hidden = false;

  const btn = document.getElementById('gemmaDownloadBtn');
  if (btn) {
    btn.addEventListener('click', () => startModelDownload());
  }
}

function startModelDownload() {
  if (!window.GemmaPlugin) return;
  const btn = document.getElementById('gemmaDownloadBtn');
  const wrap = document.getElementById('gemmaProgressWrap');
  const bar = document.getElementById('gemmaProgressBar');
  const txt = document.getElementById('gemmaProgressText');

  if (btn) btn.disabled = true;
  if (wrap) wrap.hidden = false;

  GemmaPlugin.downloadModel(
    (progress, done) => {
      if (bar) bar.style.width = progress + '%';
      if (txt) txt.textContent = progress + '%';
      if (done) {
        if (txt) txt.textContent = 'Done! Initializing...';
        // Auto-initialize after download
        initGemma().then(ready => {
          const banner = document.getElementById('gemmaDownloadBanner');
          if (banner) banner.hidden = true;
          if (ready) console.log('Gemma ready after download');
        });
      }
    },
    (err) => {
      if (btn) btn.disabled = false;
      if (txt) txt.textContent = 'Download failed: ' + err;
      console.error('Download error:', err);
    }
  );
}

// ---- Prompt builder ----
function buildPrompt(r, userQuestion) {
  const ctx = `PLASTIC ANALYSIS:
Type: ${r.request_summary.plastic_type} | Object: ${r.request_summary.source_type}
Contamination: ${r.request_summary.contamination_level} | Washable: ${r.request_summary.washable}
Score: ${r.reuse_score}/100 | Verdict: ${r.verdict}
Reasons: ${r.reasons.slice(0,2).join('; ')}
Suggested process: ${r.suggested_process.join(' → ')}`;

  if (userQuestion) {
    return `<start_of_turn>user\n${SYSTEM_PROMPT}\n\n${ctx}\n\nQuestion: ${userQuestion}<end_of_turn>\n<start_of_turn>model\n`;
  }
  return `<start_of_turn>user\n${SYSTEM_PROMPT}\n\n${ctx}\n\nGive a brief friendly explanation (2 sentences), one safety tip, and one creative reuse idea. Max 120 words.<end_of_turn>\n<start_of_turn>model\n`;
}

// ---- Streaming message helpers ----
function addStreamingMessage() {
  const container = document.getElementById('gemmaChat');
  if (!container) return null;
  const div = document.createElement('div');
  div.className = 'chat-msg chat-assistant';
  div.innerHTML = '<span class="chat-bubble">▋</span><span class="chat-time">' + new Date().toLocaleTimeString() + '</span>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

function updateStreamingMessage(el, text) {
  if (!el) return;
  el.querySelector('.chat-bubble').textContent = text + (text.endsWith('.') ? '' : '▋');
  const container = document.getElementById('gemmaChat');
  if (container) container.scrollTop = container.scrollHeight;
}

function finalizeStreamingMessage(el, text) {
  if (!el) return;
  el.querySelector('.chat-bubble').textContent = text;
}

// ---- Generate ----
async function generateGemmaResponse(analysisResult, userQuestion = null) {
  const prompt = buildPrompt(analysisResult, userQuestion);

  if (gemmaReady && window.GemmaPlugin) {
    return new Promise((resolve) => {
      let fullText = '';
      const msgEl = addStreamingMessage();

      GemmaPlugin.generate(
        prompt,
        (chunk, done) => {
          if (chunk) fullText += chunk;
          updateStreamingMessage(msgEl, fullText);
          if (done) {
            finalizeStreamingMessage(msgEl, fullText);
            // Add to history without re-rendering (already in DOM)
            chatHistory.push({ role: 'assistant', text: fullText, time: new Date().toLocaleTimeString() });
            resolve({ text: fullText, source: 'gemma' });
          }
        },
        (err) => {
          console.warn('Gemma error:', err);
          const fallback = buildFallbackResponse(analysisResult, userQuestion);
          finalizeStreamingMessage(msgEl, fallback);
          chatHistory.push({ role: 'assistant', text: fallback, time: new Date().toLocaleTimeString() });
          resolve({ text: fallback, source: 'rules' });
        }
      );
    });
  }

  // No Gemma — use fallback directly
  const text = buildFallbackResponse(analysisResult, userQuestion);
  addToChat('assistant', text);
  return { text, source: 'rules' };
}

// ---- Rule-based fallback (usa knowledge_base.js) ----
function buildFallbackResponse(r, userQuestion) {
  const type = (r && r.request_summary && r.request_summary.plastic_type) || 'UNKNOWN';
  const score = (r && r.reuse_score) || '—';
  const verdict = (r && r.verdict) || '';

  const VERDICTS = {
    GOOD_CANDIDATE:    'Excelente — este plástico tiene buen potencial de reutilización.',
    CONDITIONAL_REUSE: 'Este plástico puede reutilizarse con algo de preparación previa.',
    LIMITED_REUSE:     'Las opciones de reutilización son limitadas; úsalo en aplicaciones de bajo riesgo.',
    REJECTED:          'No se recomienda reutilizar este artículo en su estado actual.',
  };

  // Con pregunta: respuesta contextual desde la KB
  if (userQuestion) {
    return matchKB(type, userQuestion);
  }

  // Sin pregunta: resumen general + tip rotativo
  const tip = matchKB(type, '');
  const verdict_es = VERDICTS[verdict] || '';
  return `${verdict_es} Puntuación: ${score}/100. ${tip}`;
}

// ---- Chat history & render ----
const chatHistory = [];

function addToChat(role, text) {
  chatHistory.push({ role, text, time: new Date().toLocaleTimeString() });
  renderChat();
}

function renderChat() {
  const container = document.getElementById('gemmaChat');
  if (!container) return;
  container.innerHTML = chatHistory.map(m => `
    <div class="chat-msg chat-${m.role}">
      <span class="chat-bubble">${m.text}</span>
      <span class="chat-time">${m.time}</span>
    </div>
  `).join('');
  container.scrollTop = container.scrollHeight;
}

// ---- Public API ----
async function askGemma(analysisResult, userQuestion = null) {
  if (!analysisResult) return;
  if (userQuestion) addToChat('user', userQuestion);
  return generateGemmaResponse(analysisResult, userQuestion);
}
