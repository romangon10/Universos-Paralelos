import test from 'node:test';
import assert from 'node:assert/strict';
import { chooseTransition, interpolate } from '../simulation.js';
test('transitions always stay in range and change universe, including RNG extremes', () => {
  for (const a of [0,.2,.5,.999999]) for (const b of [0,.2,.5,.999999]) {
    let first=true;
    const value=chooseTransition(5,()=>{const n=first?a:b;first=false;return n;});
    assert.ok(value.from>=0&&value.from<5&&value.to>=0&&value.to<5);
    assert.notEqual(value.from,value.to);
  }
});
test('invalid universe counts and RNG values fail explicitly', () => {
  assert.throws(()=>chooseTransition(1),RangeError);
  assert.throws(()=>chooseTransition(5,()=>1),RangeError);
});
test('interpolation clamps endpoints and yields midpoint', () => {
  const a={x:0,y:20},b={x:100,y:40};
  assert.deepEqual(interpolate(a,b,-1),a);assert.deepEqual(interpolate(a,b,2),b);
  assert.deepEqual(interpolate(a,b,.5),{x:50,y:30});
});
