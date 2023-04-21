import 'regenerator-runtime/runtime';
import { any, range } from '../src/index.js';

test('any on a big list', () => {
  const test = any(range(0, Number.MAX_SAFE_INTEGER));
  expect(test).toBe(true);
});

test('!any on empty list', () => {
  const test = any([]);
  expect(test).toBe(false);
});

test('any on an array', () => {
  const test = any([1, 2, 3, 4, 5]);
  expect(test).toBe(true);
});

test('any on an array with random values', () => {
  const test = any([undefined, null, 0, '']);
  expect(test).toBe(true);
});

test('!any with predicate', () => {
  const test = any(range(1, 5), (x) => x > 10);
  expect(test).toBe(false);
});
