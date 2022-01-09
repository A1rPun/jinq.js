import 'regenerator-runtime/runtime';
import { range, union } from '../index.js';

test('union of two lists', () => {
  const test = union(range(1, 4), range(1, 4));
  expect([...test]).toStrictEqual([1, 2, 3, 4]);
});

test('union of two lists', () => {
  const test = union(range(3, 6), range(1, 4));
  expect([...test]).toStrictEqual([3, 4, 5, 6, 1, 2]);
});

test('union of two big lists', () => {
  const test = union(range(0, Number.MAX_SAFE_INTEGER), range(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toBe(0);
});
