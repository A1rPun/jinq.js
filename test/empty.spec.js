import 'regenerator-runtime/runtime';
import { empty, toList } from '../index.js';

test('empty list', () => {
  const test = toList(empty());
  expect(test).toStrictEqual([]);
});
test('empty result', () => {
  const test = empty().next();
  expect(test.value).toBe(undefined);
  expect(test.done).toBe(true);
});
