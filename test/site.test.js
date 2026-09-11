import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const html = readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('entrypoint includes viewport, language and valid local asset paths',()=>{
  assert.match(html, /lang="es"/); assert.match(html, /name="viewport"/);
  for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const path=match[1];if(/^(https?:|mailto:)/.test(path))continue;
    assert.ok(existsSync(new URL('../'+path,import.meta.url)), 'Missing asset '+path);
  }
});
test('browser scripts parse without syntax errors',()=>{
  for(const file of ['script.js','simulation.js']) {
    const url = new URL('../'+file,import.meta.url);if(!existsSync(url))continue;
    const result=spawnSync(process.execPath,['--check',url.pathname],{encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);
  }
});
