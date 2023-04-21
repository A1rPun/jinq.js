import 'regenerator-runtime/runtime';
import { max, maxBy, range } from '../src/index.js';

/* Max */
test('max of a list', () => {
  const test = max(range(1, 10));
  expect(test).toBe(10);
});

test('max of an array', () => {
  const test = max([1, 42, 42]);
  expect(test).toBe(42);
});

test('max of an empty array', () => {
  const test = max([]);
  expect(test).toBe(-Infinity);
});

/* MaxBy */
test('maxBy on a list', () => {
  const test = maxBy(range(1, 10));
  expect(test).toStrictEqual(10);
});

test('maxBy with selector', () => {
  const test = maxBy(range(1, 10), (x) => x - 1);
  expect(test).toStrictEqual(9);
});
