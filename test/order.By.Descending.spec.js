import {
  order,
  orderBy,
  orderByDescending,
} from '../src/index.js';

/* Order */
test('orderBy on a list', () => {
  const test = order([2, 1, 1, 3, 5, 4]);
  expect([...test]).toStrictEqual([1, 1, 2, 3, 4, 5]);
});

/* OrderBy */
test('orderBy on a list', () => {
  const test = orderBy([2, 1, 1, 3, 5, 4]);
  expect([...test]).toStrictEqual([1, 1, 2, 3, 4, 5]);
});

test('orderBy on a list of objects', () => {
  const test = orderBy(
    [
      { id: 3, name: 'baz' },
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
    ],
    (x) => x.id
  );
  expect([...test]).toStrictEqual([
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'baz' },
  ]);
});

/* OrderByDescending */
test('orderByDescending on a list', () => {
  const test = orderByDescending([2, 1, 1, 3, 5, 4]);
  expect([...test]).toStrictEqual([5, 4, 3, 2, 1, 1]);
});

test('orderByDescending on a list of objects', () => {
  const test = orderByDescending(
    [
      { id: 3, name: 'baz' },
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
    ],
    (x) => x.id
  );
  expect([...test]).toStrictEqual([
    { id: 3, name: 'baz' },
    { id: 2, name: 'bar' },
    { id: 1, name: 'foo' },
  ]);
});
