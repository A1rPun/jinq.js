import 'regenerator-runtime/runtime';
import { last, range } from '../index.js';

test('last value of a list', () => {
  const test = last(range(0, 10));
  expect(test).toBe(10);
});
test('last with predicate', () => {
  const test = last(range(1, 5), (x) => x < 3);
  expect(test).toBe(2);
});
test('last value of an empty list', () => {
  const test = last([]);
  expect(test).toBe(undefined);
});
