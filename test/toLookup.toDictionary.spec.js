import 'regenerator-runtime/runtime';
import { toDictionary, toLookup } from '../index.js';

/* ToDictionary */
test('toDictionary from a list', () => {
  const test = toDictionary([1, 1, 2, 2]);
  expect(test).toStrictEqual({ 1: 1, 2: 2 });
});

/* ToLookup */
test('toLookup from a list', () => {
  const test = toLookup([1, 1, 2, 2]);
  expect(test).toStrictEqual({ 1: [1, 1], 2: [2, 2] });
});
