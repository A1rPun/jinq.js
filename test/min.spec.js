import 'regenerator-runtime/runtime';
import { empty, min, range } from '../index.js';

test('min of a list', () => {
  const test = min(range(1, 10));
  expect(test).toBe(1);
});
test('min of an array', () => {
  const test = min([1, 1, 40]);
  expect(test).toBe(1);
});
test('min of an empty array', () => {
  const test = min(empty());
  expect(test).toBe(Infinity);
});
