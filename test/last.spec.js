import 'regenerator-runtime/runtime';
import { last, lastOrDefault, range } from '../src/index.js';

test('last value of a list', () => {
  const test = last(range(0, 10));
  expect(test).toBe(9);
});

test('last with predicate', () => {
  const test = last(range(1, 5), (x) => x < 3);
  expect(test).toBe(2);
});

test('!last value of an empty list', () => {
  expect(() => {
    last([]);
  }).toThrow();
});

test('!last with faulty predicate', () => {
  expect(() => {
    last(range(1, 3), (x) => x < -1);
  }).toThrow();
});

test('!lastOrDefault on a list', () => {
  const test = lastOrDefault(range(1, 3), (x) => x > 3);
  expect(test).toBe(undefined);
});

test('lastOrDefault on a list with default', () => {
  const test = lastOrDefault(range(1, 3), (x) => x > 3, 1);
  expect(test).toBe(1);
});
