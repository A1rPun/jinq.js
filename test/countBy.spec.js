import 'regenerator-runtime/runtime';
import { countBy, repeat } from '../src/index.js';

test('countBy a list', () => {
  const test = countBy(repeat(1, 10));
  expect(test).toStrictEqual(new Map([[1, 10]]));
});

test('countBy an array', () => {
  const test = countBy([1, 1, 2, 2, 2]);
  expect(test).toStrictEqual(new Map([[1, 2], [2, 3]]));
});

test('countBy with predicate', () => {
  const test = countBy(repeat(1, 2), (x) => x + 1);
  expect(test).toStrictEqual(new Map([[2, 2]]));
});

test('countBy an empty list', () => {
  const test = countBy([]);
  expect(test).toStrictEqual(new Map());
});
