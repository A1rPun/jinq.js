import 'regenerator-runtime/runtime';
import { distinct, repeat, toList } from '../index.js';

test('distinct on a list', () => {
  const test = toList(distinct(repeat(1, 3)));
  expect(test).toStrictEqual([1]);
});
test('distinct on an array', () => {
  const test = toList(distinct([1, 1, 2, 3, 4, 4, 5]));
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});
test('distinct on an array of objects', () => {
  const obj = { 1: 1 };
  const test = toList(distinct([obj, obj, { 2: 2 }]));
  expect(test).toStrictEqual([obj, { 2: 2 }]);
});
