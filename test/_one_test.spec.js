import 'regenerator-runtime/runtime';
import {
  average,
  concat,
  elementAt,
  except,
  intersect,
  max,
  min,
  ofType,
  range,
  repeat,
  reverse,
  sum,
  toList,
  where,
} from '../index.js';

/* Average */
test('average a list', () => {
  const test = average(range(1, 9));
  expect(test).toBe(5);
});

/* Concat */
test('concat a list', () => {
  const test = toList(concat(range(1, 3), range(4, 6)));
  expect(test).toStrictEqual([1, 2, 3, 4, 5, 6]);
});

/* ElementAt */
test('elementAt on big list', () => {
  const test = elementAt(range(0, Number.MAX_SAFE_INTEGER), 10);
  expect(test).toBe(10);
});

/* Except */
test('except on a list', () => {
  const test = toList(except(range(1, 5), range(3, 8)));
  expect(test).toStrictEqual([1, 2]);
});

/* Intersect */
test('intersect on a list', () => {
  const test = toList(intersect(range(1, 5), range(3, 8)));
  expect(test).toStrictEqual([3, 4, 5]);
});

/* Max */
test('max of a list', () => {
  const test = max(range(1, 29));
  expect(test).toBe(29);
});

/* Min */
test('min of a list', () => {
  const test = min(range(1, 10));
  expect(test).toBe(1);
});

/* OfType */
test('ofType on a list', () => {
  const test = toList(ofType(['1', 2, '3', 4, '5'], 'number'));
  expect(test).toStrictEqual([2, 4]);
});

/* Range */
test('range of 5 integers', () => {
  const test = toList(range(1, 5));
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});

/* Repeat */
test('repeats value 29, 3 times', () => {
  const test = toList(repeat(29, 3));
  expect(test).toStrictEqual([29, 29, 29]);
});

/* Reverse */
test('reverse a list', () => {
  const test = toList(reverse(range(1, 5)));
  expect(test).toStrictEqual([5, 4, 3, 2, 1]);
});

/* Sum */
test('sum of a list', () => {
  const test = sum(range(1, 10));
  expect(test).toBe(55);
});

/* Where */
test('where every value is smaller than 3', () => {
  const test = toList(where(range(1, 4), (x) => x < 3));
  expect(test).toStrictEqual([1, 2]);
});
