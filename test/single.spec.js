import 'regenerator-runtime/runtime';
import { range, single, singleOrDefault } from '../src/index.js';

test('single value on a list with single value', () => {
  const test = single(range(0, 0));
  expect(test).toBe(0);
});

test('!single on a list with multiple values', () => {
  expect(() => {
    single(range(1, 3));
  }).toThrow();
});

test('!single with predicate', () => {
  expect(() => {
    single(range(1, 5), (x) => x > 3);
  }).toThrow();
});

test('!single of an empty list', () => {
  expect(() => {
    single([]);
  }).toThrow();
});

test('!single on big list', () => {
  expect(() => {
    single(range(0, Number.MAX_SAFE_INTEGER));
  }).toThrow();
});

test('single on an array with undefined values', () => {
  const test = [];
  test[4] = 1;
  expect(single(test)).toBe(1);
});

test('!singleOrDefault on a list', () => {
  const test = singleOrDefault(range(1, 3), (x) => x > 3);
  expect(test).toBe(undefined);
});

test('singleOrDefault on a list with default', () => {
  const test = singleOrDefault(range(1, 3), (x) => x > 3, 1);
  expect(test).toBe(1);
});

test('!singleOrDefault with single result and default', () => {
  const test = singleOrDefault(range(1, 3), (x) => x === 3, 1);
  expect(test).toBe(3);
});
