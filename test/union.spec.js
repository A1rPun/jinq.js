import 'regenerator-runtime/runtime';
import { range, toList, union } from '../index.js';

test('union of two lists', () => {
  const test = toList(union(range(1, 4), range(1, 4)));
  expect(test).toStrictEqual([1, 2, 3, 4]);
});
test('union of two lists', () => {
  const test = toList(union(range(3, 6), range(1, 4)));
  expect(test).toStrictEqual([3, 4, 5, 6, 1, 2]);
});
