import 'regenerator-runtime/runtime';
import { range, single } from '../index.js';

test('single value on a list with single value', () => {
  const test = single(range(0, 0));
  expect(test).toBe(0);
});

test('!single on a list with multiple values', () => {
  const test = single(range(1, 3));
  expect(test).toBe(undefined);
});

test('!single with predicate', () => {
  const test = single(range(1, 5), (x) => x > 3);
  expect(test).toBe(undefined);
});

test('!single of an empty list', () => {
  const test = single([]);
  expect(test).toBe(undefined);
});

test('!single on big list', () => {
  const test = single(range(0, Number.MAX_SAFE_INTEGER));
  expect(test).toBe(undefined);
});

test('single on an array with undefined values', () => {
  const test = [];
  test[4] = 1;
  expect(single(test)).toBe(1);
});
