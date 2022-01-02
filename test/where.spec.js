import 'regenerator-runtime/runtime';
import { range, where } from '../index.js';

test('where', () => {
  const test = where(range(1, 4));
  expect([...test]).toStrictEqual([1, 2, 3, 4]);
});

test('where every value is smaller than 3', () => {
  const test = where(range(1, 4), (x) => x < 3);
  expect([...test]).toStrictEqual([1, 2]);
});

test('where on an array', () => {
  const test = where([1, 2, 3], (x) => x > 2);
  expect([...test]).toStrictEqual([3]);
});

test('where on empty list', () => {
  const test = where([]);
  expect([...test]).toStrictEqual([]);
});

test('!where predicate always false', () => {
  const test = where([1, 2, 3], (x) => x > Number.MAX_SAFE_INTEGER);
  expect([...test]).toStrictEqual([]);
});
