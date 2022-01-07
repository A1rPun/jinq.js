import 'regenerator-runtime/runtime';
import { range, toDictionary, toList, toLookup } from '../index.js';

/* ToDictionary */
test('toDictionary from a list', () => {
  const test = toDictionary([1, 1, 2, 2]);
  expect(test).toStrictEqual({ 1: 1, 2: 2 });
});

test('toDictionary from an empty list', () => {
  const test = toDictionary([]);
  expect(test).toStrictEqual({});
});

/* ToList */
test('toList from a list', () => {
  const test = toList(range(1, 2));
  expect(test).toStrictEqual([1, 2]);
});

test('toList modify state', () => {
  const it = range(1, 2);
  const test = toList(it);
  expect(test).toStrictEqual([1, 2]);
  expect([...it]).toStrictEqual([]);
});

/* ToLookup */
test('toLookup from a list', () => {
  const test = toLookup([1, 1, 2, 2]);
  expect(test).toStrictEqual({ 1: [1, 1], 2: [2, 2] });
});

test('toLookup from an empty list', () => {
  const test = toLookup([]);
  expect(test).toStrictEqual({});
});
