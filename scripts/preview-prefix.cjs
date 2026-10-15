// Verify a production build under a GitHub-style repository subpath.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const prefix = '/small-worlds/'; // Local test prefix, not a chosen GitHub repository.
const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.gz':'application/gzip', '.svg':'image/svg+xml', '.pdf':'application/pdf'};
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith(prefix)) {
    res.writeHead(302, {Location: prefix}); res.end(); return;
  }
  let file = path.resolve(root, decodeURIComponent(url.pathname.slice(prefix.length)) || 'index.html');
  if (!file.startsWith(root + path.sep)) {res.writeHead(403);res.end();return;}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  fs.readFile(file, (err, data) => {
    if (err) {res.writeHead(404);res.end('Not found');return;}
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
}).listen(5181,'127.0.0.1',()=>console.log('Subpath preview: http://127.0.0.1:5181'+prefix));
