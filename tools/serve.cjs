const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { buildCourse } = require('./build-content.cjs');
buildCourse();
const root = path.resolve(__dirname, '../docs');
const basePath = '/git-seminar/';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  if (urlPath === '/' || urlPath === '/git-seminar') {
    res.writeHead(302, { Location: basePath }).end();
    return;
  }
  if (!urlPath.startsWith(basePath)) { res.writeHead(404).end('Not found'); return; }
  urlPath = '/' + urlPath.slice(basePath.length);
  if (urlPath === '/course.json') {
    try { buildCourse(); }
    catch (error) { res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end(error.message); console.error(error.message); return; }
  }
  const filename = path.resolve(root, '.' + (urlPath === '/' ? '/index.html' : urlPath));
  if (!filename.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(filename, (err, bytes) => {
    if (err) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(bytes);
  });
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173/git-seminar/'));
