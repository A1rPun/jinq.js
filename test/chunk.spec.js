import 'regenerator-runtime/runtime';
import { chunk, range, toList } from '../index.js';

test('chunk a list', () => {
  const test = toList(chunk(range(1, 6), 2));
  expect(test).toStrictEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
});
test('chunk a list with last chunk different size', () => {
  const test = toList(chunk(range(1, 8), 3));
  expect(test).toStrictEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8],
  ]);
});
