import { jinq } from '../index.js';

test('order on an array', () => {
  const test = jinq
    .from([2, 1, 3, 1, 5, 4])
    .order()
    .toList();
  expect([...test]).toStrictEqual([1, 1, 2, 3, 4, 5]);
});

test('order on a list', () => {
  const test = jinq
    .range(1, 5)
    .shuffle()
    .order()
    .toList()
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});

test('orderDescending on an array', () => {
  const test = jinq
    .from([2, 1, 3, 1, 5, 4])
    .orderDescending()
    .toList();
  expect([...test]).toStrictEqual([5, 4, 3, 2, 1, 1]);
});

test('orderDescending on a list', () => {
  const test = jinq
    .range(1, 5)
    .shuffle()
    .orderDescending()
    .toList()
  expect(test).toStrictEqual([5, 4, 3, 2, 1]);
});

test('orderBy thenBy on an array', () => {
  const test = jinq
    .from([[3, 30], [2, 10], [1, 20], [3, 10], [2, 20]])
    .orderBy(x => x[1])
    .thenBy(x => x[0])
    .select(x => x[0] + x[1])
    .toList()
  expect(test).toStrictEqual([12, 13, 21, 22, 33]);
});

test('orderBy on a list of objects', () => {
  const test = jinq.from(
    [
      { key: 3, name: 'baz' },
      { key: 1, name: 'foo' },
      { key: 2, name: 'bar' },
    ],
  ).orderBy();
  expect([...test]).toStrictEqual([
    { key: 1, name: 'foo' },
    { key: 2, name: 'bar' },
    { key: 3, name: 'baz' },
  ]);
});

test('orderBy with keySelector', () => {
  const test = jinq.from(
    [
      { key: 3, name: 'baz' },
      { key: 1, name: 'foo' },
      { key: 2, name: 'bar' },
    ],
  ).orderBy(x => x.name);
  expect([...test]).toStrictEqual([
    { key: 2, name: 'bar' },
    { key: 3, name: 'baz' },
    { key: 1, name: 'foo' },
  ]);
});

test('orderByDescending thenByDescending on an array', () => {
  const test = jinq
    .from([[3, 30], [2, 10], [1, 20], [3, 10], [2, 20]])
    .orderByDescending(x => x[1])
    .thenByDescending(x => x[0])
    .select(x => x[0] + x[1])
    .toList()
  expect(test).toStrictEqual([33, 22, 21, 13, 12]);
});

test('orderByDescending on a list of objects', () => {
  const test = jinq.from(
    [
      { key: 3, name: 'baz' },
      { key: 1, name: 'foo' },
      { key: 2, name: 'bar' },
    ],
  ).orderByDescending();
  expect([...test]).toStrictEqual([
    { key: 3, name: 'baz' },
    { key: 2, name: 'bar' },
    { key: 1, name: 'foo' },
  ]);
});

test('orderByDescending with keySelector', () => {
  const test = jinq.from(
    [
      { key: 3, name: 'baz' },
      { key: 1, name: 'foo' },
      { key: 2, name: 'bar' },
    ],
  ).orderByDescending(x => x.name);
  expect([...test]).toStrictEqual([
    { key: 1, name: 'foo' },
    { key: 3, name: 'baz' },
    { key: 2, name: 'bar' },
  ]);
});

