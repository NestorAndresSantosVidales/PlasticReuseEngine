/**
 * Downloads MobileNet v1 model files locally for offline use in Cordova.
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const MODEL_DIR = path.join(__dirname, "www", "mobilenet_model");
if (!fs.existsSync(MODEL_DIR)) fs.mkdirSync(MODEL_DIR, { recursive: true });

const BASE = "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224";
const FILES = [
  "model.json",
  ...Array.from({ length: 55 }, (_, i) => `group1-shard${i + 1}of55.bin`),
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) { console.log("skip:", path.basename(dest)); return resolve(); }
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); console.log("✓", path.basename(dest)); resolve(); });
    }).on("error", (e) => { fs.unlinkSync(dest); reject(e); });
  });
}

(async () => {
  console.log("Downloading MobileNet model...");
  for (const f of FILES) {
    await download(`${BASE}/${f}`, path.join(MODEL_DIR, f));
  }
  console.log("Done. Model saved to www/mobilenet_model/");
})();
