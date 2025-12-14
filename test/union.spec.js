import 'regenerator-runtime/runtime';
import { range, union, unionBy } from '../src/index.js';

/* Union */
test('union of two lists', () => {
  const test = union(range(1, 4), range(1, 4));
  expect([...test]).toStrictEqual([1, 2, 3, 4]);
});

test('union of two lists', () => {
  const test = union(range(4, 3), range(1, 3));
  expect([...test]).toStrictEqual([4, 5, 6, 1, 2, 3]);
});

test('union of two big lists', () => {
  const test = union(range(0, Number.MAX_SAFE_INTEGER), range(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toBe(0);
});

/* UnionBy */
test('unionBy of two lists', () => {
  const test = unionBy(range(1, 4), range(1, 4));
  expect([...test]).toStrictEqual([1, 2, 3, 4]);
});

test('unionBy with selector', () => {
  const test = unionBy(range(1, 4), range(1, 4), (x) => x + 1);
  expect([...test]).toStrictEqual([1, 2, 3, 4]);
});
