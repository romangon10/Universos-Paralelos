import { chooseTransition, interpolate } from './simulation.js';
const canvas = document.getElementById('quantum-canvas'), ctx = canvas.getContext('2d');
const button = document.getElementById('jump-btn'), status = document.getElementById('jump-status');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const count = 5, width = 600, height = 360;
const universes = Array.from({ length: count }, (_, i) => ({ x: 70 + i * 115, y: height / 2, label: 'U' + (i + 1), color: 'hsl(' + (160 + i * 30) + ',65%,62%)' }));
let transition = null, elapsed = 0, last = 0, frame = 0;
function draw(now = 0) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  universes.forEach((u,i) => {
    ctx.beginPath(); ctx.arc(u.x,u.y,32 + (reduced.matches ? 0 : Math.sin(now / 600 + i) * 3),0,Math.PI*2);
    ctx.fillStyle = '#0e3541'; ctx.fill(); ctx.strokeStyle=u.color;ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle=u.color;ctx.font='16px monospace';ctx.textAlign='center';ctx.fillText(u.label,u.x,u.y+6);
  });
  if (transition) {
    const p = interpolate(universes[transition.from], universes[transition.to], elapsed / 1000);
    ctx.beginPath(); ctx.arc(p.x,p.y,8,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
  }
}
function finish() { status.textContent = 'Transición ficticia de U' + (transition.from + 1) + ' a U' + (transition.to + 1) + ' completada.';transition=null;button.disabled=false; }
function tick(now) {
  frame=0;if(document.hidden)return;
  if(transition){elapsed+=last?Math.min(now-last,100):0;if(elapsed>=1000)finish();}
  last=now;draw(now);
  if(!reduced.matches || transition)frame=requestAnimationFrame(tick);
}
function start(){last=0;if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
button.addEventListener('click',()=>{
  if(transition || !ctx)return;
  transition=chooseTransition(count);elapsed=0;button.disabled=true;
  status.textContent='Transición ficticia: U'+(transition.from+1)+' → U'+(transition.to+1)+'.';
  if(reduced.matches){finish();draw();}else start();
});
document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
window.addEventListener('pagehide',stop);window.addEventListener('pageshow',start);
reduced.addEventListener('change',()=>{stop();if(reduced.matches&&transition)finish();draw();if(!reduced.matches)start();});
if(!ctx){button.disabled=true;status.textContent='Tu navegador no admite la visualización. Podés leer la explicación igualmente.';}
else{canvas.width=width;canvas.height=height;draw();start();}
