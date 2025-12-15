import { cycle, repeat, take } from '../src/index.js';

test('cycle of 1 integer', () => {
  const test = take(cycle([1]), 3);
  expect([...test]).toStrictEqual([1, 1, 1]);
});

test('cycle of 2 integers', () => {
  const test = take(cycle([1, 2]), 4);
  expect([...test]).toStrictEqual([1, 2, 1, 2]);
});

test('cycle repeated source', () => {
  const test = take(cycle(repeat(1, 2)), 5);
  expect([...test]).toStrictEqual([1, 1, 1, 1, 1]);
});

test('cycle no source', () => {
  const test = take(cycle(), 5);
  expect([...test]).toStrictEqual([]);
});

test('cycle empty source', () => {
  const test = take(cycle([]), 5);
  expect([...test]).toStrictEqual([]);
});
