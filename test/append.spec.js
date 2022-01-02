import 'regenerator-runtime/runtime';
import { append, range, toList } from '../index.js';

test('append an item to a list', () => {
  const test = toList(append(range(1, 3), 4));
  expect(test).toStrictEqual([1, 2, 3, 4]);
});
test('append multiple items to a list', () => {
  const test = toList(append(range(1, 3), 4, 5));
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});
