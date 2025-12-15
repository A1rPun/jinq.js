import { sequence } from '../src/index.js';

test('sequence of integers', () => {
  const test = sequence(0, 3);
  expect([...test]).toStrictEqual([0, 1, 2, 3]);
});

test('sequence of integers with step', () => {
  const test = sequence(1, 61, 20);
  expect([...test]).toStrictEqual([1, 21, 41, 61]);
});

test('sequence empty params', () => {
  const test = sequence();
  expect([...test]).toStrictEqual([]);
});

test('sequence no sequence', () => {
  const test = sequence(10, -10);
  expect([...test]).toStrictEqual([]);
});
