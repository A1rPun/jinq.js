import 'regenerator-runtime/runtime';
import { empty, toDictionary, toLookup } from '../index.js';

/* ToDictionary */
test('toDictionary from a list', () => {
  const test = toDictionary([1, 1, 2, 2]);
  expect(test).toStrictEqual({ 1: 1, 2: 2 });
});
test('toDictionary from an empty list', () => {
  const test = toDictionary(empty());
  expect(test).toStrictEqual({});
});

/* ToLookup */
test('toLookup from a list', () => {
  const test = toLookup([1, 1, 2, 2]);
  expect(test).toStrictEqual({ 1: [1, 1], 2: [2, 2] });
});
test('toLookup from an empty list', () => {
  const test = toLookup(empty());
  expect(test).toStrictEqual({});
});
