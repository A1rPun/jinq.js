import 'regenerator-runtime/runtime';
import { min, range } from '../src/index.js';

test('min of a list', () => {
  const test = min(range(1, 10));
  expect(test).toBe(1);
});

test('min of an array', () => {
  const test = min([1, 1, 40]);
  expect(test).toBe(1);
});

test('min of an empty array', () => {
  const test = min([]);
  expect(test).toBe(Infinity);
});
