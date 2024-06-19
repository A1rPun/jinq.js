import 'regenerator-runtime/runtime';
import { elementAt, elementAtOrDefault, range } from '../src/index.js';

test('elementAt on big list', () => {
  const test = elementAt(range(0, Number.MAX_SAFE_INTEGER), 10);
  expect(test).toBe(10);
});

test('elementAt on an array', () => {
  const test = elementAt([3, 2, 1], 1);
  expect(test).toBe(2);
});

test('invalid index on an array', () => {
  expect(() => {
    elementAt([3, 2, 1], -1);
  }).toThrow();
});

test('!elementAt on empty array', () => {
  expect(() => {
    elementAt([], Number.MAX_SAFE_INTEGER);
  }).toThrow();
});

test('!elementAt on a list', () => {
  expect(() => {
    elementAt(range(1, 3), Number.MAX_SAFE_INTEGER);
  }).toThrow();
});

test('elementAtOrDefault on an array with default', () => {
  const test = elementAtOrDefault([3, 2, 1], -1, 4);
  expect(test).toBe(4);
});

test('elementAtOrDefault on a list with default', () => {
  const test = elementAtOrDefault(range(1, 3), Number.MAX_SAFE_INTEGER, 4);
  expect(test).toBe(4);
});

test('!elementAtOrDefault on a list', () => {
  const test = elementAtOrDefault(range(1, 3), 5);
  expect(test).toBe(undefined);
});
