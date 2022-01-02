import 'regenerator-runtime/runtime';
import { empty, range, single } from '../index.js';

test('single value on a list with single value', () => {
  const test = single(range(0, 0));
  expect(test).toBe(0);
});
test('single value on a list with multiple values', () => {
  const test = single(range(1, 3));
  expect(test).toBe(undefined);
});
test('single with predicate', () => {
  const test = single(range(1, 5), (x) => x > 3);
  expect(test).toBe(undefined);
});
test('single value of an empty list', () => {
  const test = single(empty());
  expect(test).toBe(undefined);
});
