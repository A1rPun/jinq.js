import { infiniteSequence, take } from '../src/index.js';

test('infiniteSequence of integers', () => {
  const test = take(infiniteSequence(42), 3);
  expect([...test]).toStrictEqual([42, 43, 44]);
});

test('infiniteSequence of integers with step', () => {
  const test = take(infiniteSequence(42, 3), 4);
  expect([...test]).toStrictEqual([42, 45, 48, 51]);
});

test('infiniteSequence of integers with negative step', () => {
  const test = take(infiniteSequence(42, -3), 3);
  expect([...test]).toStrictEqual([42, 39, 36]);
});

test('infiniteSequence empty params', () => {
  const test = take(infiniteSequence(), 2);
  expect([...test]).toStrictEqual([undefined, NaN]);
});
