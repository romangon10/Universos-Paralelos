import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const allowed = new Map([['/','index.html'],['/index.html','index.html'],['/style.css','style.css'],['/script.js','script.js'],['/simulation.js','simulation.js']]);
const types = {html:'text/html',css:'text/css',js:'text/javascript'};
const port = Number(process.env.PORT || 3000);
createServer(async (req,res) => {
  const path = new URL(req.url,'http://localhost').pathname;
  const file = allowed.get(path);
  if (req.method !== 'GET' || !file) { res.writeHead(404); return res.end('Not found'); }
  try {
    const body = await readFile(new URL('../'+file,import.meta.url));
    res.writeHead(200,{'Content-Type':types[file.split('.').pop()]+'; charset=utf-8','X-Content-Type-Options':'nosniff'});res.end(body);
  } catch {res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+port));
