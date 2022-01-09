import 'regenerator-runtime/runtime';
import { first, range } from '../index.js';

test('first value of a big list', () => {
  const test = first(range(0, Number.MAX_SAFE_INTEGER));
  expect(test).toBe(0);
});

test('first with predicate', () => {
  const test = first(range(1, 5), (x) => x > 3);
  expect(test).toBe(4);
});

test('first value of an empty list', () => {
  const test = first([]);
  expect(test).toBe(undefined);
});
