import { intersperse, range } from '../src/index.js';

test('intersperse a list', () => {
  const test = intersperse(range(4, 3), 3);
  expect([...test]).toStrictEqual([4, 3, 5, 3, 6]);
});

test('intersperse an array', () => {
  const test = intersperse([1, 2, 3], 0);
  expect([...test]).toStrictEqual([1, 0, 2, 0, 3]);
});

test('intersperse no middle', () => {
  const test = intersperse([0], 1);
  expect([...test]).toStrictEqual([0]);
});

test('intersperse empty source', () => {
  const test = intersperse([], 0);
  expect([...test]).toStrictEqual([]);
});

test.skip('intersperse empty params', () => {
  const test = intersperse();
  expect([...test]).toStrictEqual([]);
});
