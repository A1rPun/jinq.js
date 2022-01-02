import 'regenerator-runtime/runtime';
import { empty, range, sum } from '../index.js';

test('sum of a list', () => {
  const test = sum(range(1, 10));
  expect(test).toBe(55);
});
test('sum of an array', () => {
  const test = sum([1, 1, 40]);
  expect(test).toBe(42);
});
test('sum of an empty array', () => {
  const test = sum(empty());
  expect(test).toBe(0);
});
