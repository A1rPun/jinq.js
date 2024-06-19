import 'regenerator-runtime/runtime';
import { first, firstOrDefault, range } from '../src/index.js';

test('first value of a big list', () => {
  const test = first(range(0, Number.MAX_SAFE_INTEGER));
  expect(test).toBe(0);
});

test('first with predicate', () => {
  const test = first(range(1, 5), (x) => x > 3);
  expect(test).toBe(4);
});

test('!first value of an empty list', () => {
  expect(() => {
    first([]);
  }).toThrow();
});

test('!first with faulty predicate', () => {
  expect(() => {
    first(range(1, 3), (x) => x < -1);
  }).toThrow();
});

test('!firstOrDefault on a list', () => {
  const test = firstOrDefault(range(1, 3), (x) => x > 3);
  expect(test).toBe(undefined);
});

test('firstOrDefault on a list with default', () => {
  const test = firstOrDefault(range(1, 3), (x) => x > 3, 1);
  expect(test).toBe(1);
});
