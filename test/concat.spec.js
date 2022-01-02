import 'regenerator-runtime/runtime';
import { concat, range } from '../index.js';

test('concat a list', () => {
  const test = concat(range(1, 3), range(4, 6));
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5, 6]);
});

test('concat nothing', () => {
  const test = concat();
  expect([...test]).toStrictEqual([]);
});
