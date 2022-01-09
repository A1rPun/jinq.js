import 'regenerator-runtime/runtime';
import { chunk, range } from '../index.js';

test('chunk a list', () => {
  const test = chunk(range(1, 6), 2);
  expect([...test]).toStrictEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
});

test('chunk a list with last chunk different size', () => {
  const test = chunk(range(1, 8), 3);
  expect([...test]).toStrictEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8],
  ]);
});

test('chunk an array', () => {
  const test = chunk([1, 2, 3], 2);
  expect([...test]).toStrictEqual([[1, 2], [3]]);
});

test('chunk on big list', () => {
  const test = chunk(range(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toStrictEqual([0]);
});
