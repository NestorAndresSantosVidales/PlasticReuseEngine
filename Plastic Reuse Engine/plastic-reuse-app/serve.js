const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const WWW = path.join(__dirname, 'www');

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.bin': 'application/octet-stream',
  '.tflite': 'application/octet-stream', '.txt': 'text/plain',
  '.jpg': 'image/jpeg', '.png': 'image/png',
};

http.createServer((req, res) => {
  const filePath = path.join(WWW, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + req.url); return; }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Serving at http://localhost:${PORT}`));
