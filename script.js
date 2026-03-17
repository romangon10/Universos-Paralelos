const canvas = document.getElementById('quantum-canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const universeCount = 5; // Cantidad de universos paralelos
const universes = [];

class Universe {
  constructor(x, y, radius, color, label) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.label = label;
    this.alpha = 0.2;
    this.pulseDirection = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Texto
    ctx.fillStyle = '#00ffe1';
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(this.label, this.x, this.y + this.radius + 20);
  }

  pulse() {
    this.alpha += 0.01 * this.pulseDirection;
    if (this.alpha >= 0.6 || this.alpha <= 0.2) this.pulseDirection *= -1;
  }
}

// Crear universos
for (let i = 0; i < universeCount; i++) {
  const x = (width / (universeCount + 1)) * (i + 1);
  const y = height / 2;
  const radius = 50 + Math.random() * 20;
  const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
  universes.push(new Universe(x, y, radius, color, `Universo ${i + 1}`));
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  universes.forEach(universe => {
    universe.pulse();
    universe.draw();
  });
}

function quantumJump() {
  // Animación de salto: un círculo brillante que conecta dos universos al azar
  const fromIndex = Math.floor(Math.random() * universeCount);
  let toIndex = Math.floor(Math.random() * universeCount);
  while (toIndex === fromIndex) toIndex = Math.floor(Math.random() * universeCount);

  const from = universes[fromIndex];
  const to = universes[toIndex];

  let progress = 0;
  const duration = 60; // frames
  function animate() {
    ctx.clearRect(0, 0, width, height);
    universes.forEach(u => { u.pulse(); u.draw(); });

    // Interpolación
    const x = from.x + (to.x - from.x) * progress;
    const y = from.y + (to.y - from.y) * progress;

    // Círculo brillante
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 20;
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();

    progress += 1 / duration;
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  animate();
}

document.getElementById('jump-btn').addEventListener('click', quantumJump);

draw();
setInterval(draw, 50);
