import 'regenerator-runtime/runtime';
import { distinct, repeat } from '../index.js';

test('distinct on a list', () => {
  const test = distinct(repeat(1, 3));
  expect([...test]).toStrictEqual([1]);
});

test('distinct on an array', () => {
  const test = distinct([1, 1, 2, 3, 4, 4, 5]);
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5]);
});

test('distinct on an array of objects', () => {
  const obj = { 1: 1 };
  const test = distinct([obj, obj, { 2: 2 }]);
  expect([...test]).toStrictEqual([obj, { 2: 2 }]);
});

test('distinct on big list', () => {
  const test = distinct(repeat(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toBe(0);
});
