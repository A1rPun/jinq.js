import 'regenerator-runtime/runtime';
import { range, select } from '../index.js';

test('select default', () => {
  const test = select(range(1, 5));
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5]);
});

test('select the value + 1', () => {
  const test = select(range(1, 5), (x) => x + 1);
  expect([...test]).toStrictEqual([2, 3, 4, 5, 6]);
});

test('select empty list', () => {
  const test = select([]);
  expect([...test]).toStrictEqual([]);
});

test('select on big list', () => {
  const test = select(range(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toBe(0);
});
