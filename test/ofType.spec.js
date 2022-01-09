import 'regenerator-runtime/runtime';
import { ofType, range } from '../index.js';

test('ofType on a list', () => {
  const test = ofType(range(1, 3), 'number');
  expect([...test]).toStrictEqual([1, 2, 3]);
});

test('ofType on a number array', () => {
  const test = ofType(['1', 2, '3', 4, '5'], 'number');
  expect([...test]).toStrictEqual([2, 4]);
});

test('ofType on a string array', () => {
  const test = ofType(['1', 2, '3', 4, '5'], 'string');
  expect([...test]).toStrictEqual(['1', '3', '5']);
});

test('ofType on an empty array', () => {
  const test = ofType([], 'number');
  expect([...test]).toStrictEqual([]);
});

test('ofType on big list', () => {
  const test = ofType(range(0, Number.MAX_SAFE_INTEGER), 'number');
  expect(test.next().value).toBe(0);
});
