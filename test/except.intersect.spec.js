import { except, exceptBy, intersect, intersectBy, range } from '../src/index.js';

/* Except */
test('except on a list', () => {
  const test = except(range(1, 5), range(3, 8));
  expect([...test]).toStrictEqual([1, 2]);
});

test('except on big list', () => {
  const test = except(range(0, Number.MAX_SAFE_INTEGER), [0]);
  expect(test.next().value).toBe(1);
});

/* ExceptBy */
test('exceptBy on a list', () => {
  const test = exceptBy(range(1, 5), range(3, 8));
  expect([...test]).toStrictEqual([1, 2]);
});

test('exceptBy with selector', () => {
  const test = exceptBy(range(1, 5), range(3, 8), (x) => x - 1);
  expect([...test]).toStrictEqual([1, 2]);
});

/* Intersect */
test('intersect on a list', () => {
  const test = intersect(range(1, 5), range(3, 8));
  expect([...test]).toStrictEqual([3, 4, 5]);
});

test('intersect on big list', () => {
  const test = intersect(range(0, Number.MAX_SAFE_INTEGER), [0]);
  expect(test.next().value).toBe(0);
});

/* IntersectBy */
test('intersectBy on a list', () => {
  const test = intersectBy(range(1, 5), range(3, 8));
  expect([...test]).toStrictEqual([3, 4, 5]);
});

test('intersectBy with selector', () => {
  const test = intersectBy(range(1, 5), range(3, 8), (x) => x - 1);
  expect([...test]).toStrictEqual([3, 4, 5]);
});
