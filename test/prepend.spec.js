import 'regenerator-runtime/runtime';
import { prepend, range, toList } from '../index.js';

test('prepend an item to a list', () => {
  const test = toList(prepend(range(2, 4), 1));
  expect(test).toStrictEqual([1, 2, 3, 4]);
});
test('prepend multiple items to a list', () => {
  const test = toList(prepend(range(2, 4), 0, 1));
  expect(test).toStrictEqual([0, 1, 2, 3, 4]);
});
