import 'regenerator-runtime/runtime';
import { empty, range, sequenceEqual } from '../index.js';

test('sequenceEqual of list and array', () => {
  const test = sequenceEqual(range(1, 5), [1, 2, 3, 4, 5]);
  expect(test).toBe(true);
});
test('sequenceEqual of two lists', () => {
  const test = sequenceEqual(range(1, 5), range(1, 5));
  expect(test).toBe(true);
});
test('!sequenceEqual of two uneven lists', () => {
  const test = sequenceEqual([1, 2], range(1, 5));
  expect(test).toBe(false);
});
test('!sequenceEqual of two uneven lists', () => {
  const test = sequenceEqual(range(1, Number.MAX_SAFE_INTEGER), [1, 2]);
  expect(test).toBe(false);
});
test('sequenceEqual of two empty lists', () => {
  const test = sequenceEqual(empty(), empty());
  expect(test).toBe(true);
});
