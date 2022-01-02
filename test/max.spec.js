import 'regenerator-runtime/runtime';
import { empty, max, range } from '../index.js';

test('max of a list', () => {
  const test = max(range(1, 29));
  expect(test).toBe(29);
});
test('max of an array', () => {
  const test = max([1, 1, 40]);
  expect(test).toBe(40);
});
test('max of an empty array', () => {
  const test = max(empty());
  expect(test).toBe(-Infinity);
});
