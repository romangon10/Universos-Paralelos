export function chooseTransition(count, random = Math.random) {
  if (!Number.isInteger(count) || count < 2) throw new RangeError('At least two universes required');
  const a = random(), b = random();
  if (![a,b].every(x => Number.isFinite(x) && x >= 0 && x < 1)) throw new RangeError('Random values must be in [0, 1)');
  const from = Math.floor(a * count), slot = Math.floor(b * (count - 1));
  return { from, to: slot >= from ? slot + 1 : slot };
}
export function interpolate(from, to, progress) {
  const t = Math.max(0, Math.min(1, progress));
  return { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
}
