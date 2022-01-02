import 'regenerator-runtime/runtime';
import {
  concat,
  elementAt,
  except,
  intersect,
  ofType,
  range,
  repeat,
  reverse,
  where,
} from '../index.js';

/* Concat */
test('concat a list', () => {
  const test = concat(range(1, 3), range(4, 6));
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5, 6]);
});

/* ElementAt */
test('elementAt on big list', () => {
  const test = elementAt(range(0, Number.MAX_SAFE_INTEGER), 10);
  expect(test).toBe(10);
});

/* Except */
test('except on a list', () => {
  const test = except(range(1, 5), range(3, 8));
  expect([...test]).toStrictEqual([1, 2]);
});

/* Intersect */
test('intersect on a list', () => {
  const test = intersect(range(1, 5), range(3, 8));
  expect([...test]).toStrictEqual([3, 4, 5]);
});

/* OfType */
test('ofType on a list', () => {
  const test = ofType(['1', 2, '3', 4, '5'], 'number');
  expect([...test]).toStrictEqual([2, 4]);
});

/* Range */
test('range of 5 integers', () => {
  const test = range(1, 5);
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5]);
});

/* Repeat */
test('repeats value 29, 3 times', () => {
  const test = repeat(29, 3);
  expect([...test]).toStrictEqual([29, 29, 29]);
});

/* Reverse */
test('reverse a list', () => {
  const test = reverse(range(1, 5));
  expect([...test]).toStrictEqual([5, 4, 3, 2, 1]);
});

/* Where */
test('where every value is smaller than 3', () => {
  const test = where(range(1, 4), (x) => x < 3);
  expect([...test]).toStrictEqual([1, 2]);
});
