import 'regenerator-runtime/runtime';
import { range } from '../src/index.js';

test('range of 5 integers', () => {
  const test = range(1, 5);
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5]);
});

test('range no range', () => {
  const test = range();
  expect([...test]).toStrictEqual([]);
});

test('range no range', () => {
  const test = range(10, -10);
  expect([...test]).toStrictEqual([]);
});
