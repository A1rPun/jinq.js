import 'regenerator-runtime/runtime';
import { elementAt, elementAtOrDefault, range } from '../index.js';

test('elementAt on big list', () => {
  const test = elementAt(range(0, Number.MAX_SAFE_INTEGER), 10);
  expect(test).toBe(10);
});

test('elementAt on an array', () => {
  const test = elementAt([3, 2, 1], 1);
  expect(test).toBe(2);
});

test('!elementAt on empty list', () => {
  const test = elementAt([], Number.MAX_SAFE_INTEGER);
  expect(test).toBe(undefined);
});

test('!elementAtOrDefault on a list', () => {
  const test = elementAtOrDefault(range(1, 3), 5);
  expect(test).toBe(null);
});
