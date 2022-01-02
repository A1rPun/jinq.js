import 'regenerator-runtime/runtime';
import { range, select, toList } from '../index.js';

test('select default', () => {
  const test = toList(select(range(1, 5)));
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});
test('select the value + 1', () => {
  const test = toList(select(range(1, 5), (x) => x + 1));
  expect(test).toStrictEqual([2, 3, 4, 5, 6]);
});
