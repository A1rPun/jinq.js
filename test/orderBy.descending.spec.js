import 'regenerator-runtime/runtime';
import {
  orderBy,
  orderByDescending,
  thenBy,
  thenByDescending,
} from '../index.js';

/* OrderBy */
test('orderBy on a list', () => {
  const test = orderBy([2, 1, 3, 5, 4]);
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5]);
});

/* OrderByDescending */
test('orderByDescending on a list', () => {
  const test = orderByDescending([2, 1, 3, 5, 4]);
  expect([...test]).toStrictEqual([5, 4, 3, 2, 1]);
});
