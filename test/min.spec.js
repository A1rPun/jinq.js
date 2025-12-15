import { min, minBy, range } from '../src/index.js';

/* Min */
test('min of a list', () => {
  const test = min(range(1, 10));
  expect(test).toBe(1);
});

test('min of an array', () => {
  const test = min([1, 1, 42]);
  expect(test).toBe(1);
});

test('min of an empty array', () => {
  const test = min([]);
  expect(test).toBe(Infinity);
});

/* MinBy */
test('minBy on a list', () => {
  const test = minBy(range(1, 10));
  expect(test).toStrictEqual(1);
});

test('minBy with selector', () => {
  const test = minBy(range(1, 10), (x) => x + 1);
  expect(test).toStrictEqual(2);
});
