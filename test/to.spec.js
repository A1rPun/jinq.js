import 'regenerator-runtime/runtime';
import {
  range,
  repeat,
  toArray,
  toDictionary,
  toHashSet,
  toList,
  toLookup,
} from '../src/index.js';

/* ToDictionary */
test('toDictionary from a list', () => {
  const test = toDictionary(range(1, 2));
  expect(test).toStrictEqual(
    new Map([
      [1, 1],
      [2, 2],
    ])
  );
});

test('toDictionary from an array', () => {
  const test = toDictionary([1, 1, 2, 2]);
  expect(test).toStrictEqual(
    new Map([
      [1, 1],
      [2, 2],
    ])
  );
});

test('toDictionary from an empty list', () => {
  const test = toDictionary([]);
  expect(test).toStrictEqual(new Map());
});

/* ToHashSet */
test('toHashSet from list', () => {
  const test = toHashSet(repeat(1, 3));
  expect(test).toStrictEqual(new Set([1]));
});

test('toHashSet from an array', () => {
  const test = toHashSet([1, 1, 2, 2]);
  expect(test).toStrictEqual(new Set([1, 2]));
});

test('toHashSet from an empty list', () => {
  const test = toHashSet([]);
  expect(test).toStrictEqual(new Set());
});

/* ToList */
test('toList from a list', () => {
  const test = toList(range(1, 2));
  expect(test).toStrictEqual([1, 2]);
});

test('toList from an array', () => {
  const test = toList([1, 1, 2, 2]);
  expect(test).toStrictEqual([1, 1, 2, 2]);
});

test('toArray is the same as toList', () => {
  const test = toArray([1, 1, 2, 2]);
  expect(test).toStrictEqual(toList([1, 1, 2, 2]));
});

/* ToLookup */
test('toLookup from a list', () => {
  const test = toLookup(range(1, 2));
  expect(test).toStrictEqual(
    new Map([
      [1, [1]],
      [2, [2]],
    ])
  );
});

test('toLookup from an array', () => {
  const test = toLookup([1, 1, 2, 2]);
  expect(test).toStrictEqual(
    new Map([
      [1, [1, 1]],
      [2, [2, 2]],
    ])
  );
});

test('toLookup from an empty list', () => {
  const test = toLookup([]);
  expect(test).toStrictEqual(new Map());
});
