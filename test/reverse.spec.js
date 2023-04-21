import 'regenerator-runtime/runtime';
import { range, reverse } from '../src/index.js';

test('reverse a list', () => {
  const test = reverse(range(1, 5));
  expect([...test]).toStrictEqual([5, 4, 3, 2, 1]);
});

test('reverse an array', () => {
  const test = reverse([1, 2, 3]);
  expect([...test]).toStrictEqual([3, 2, 1]);
});

test('reverse empty list', () => {
  const test = reverse([]);
  expect([...test]).toStrictEqual([]);
});
