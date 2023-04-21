import 'regenerator-runtime/runtime';
import { aggregate, range } from '../src/index.js';

test('aggregate on a list', () => {
  const test = aggregate(range(1, 10), 0, (acc, cur) => acc + cur);
  expect(test).toBe(55);
});

test('aggregate on an array', () => {
  const test = aggregate(['foo', 'bar'], '', (acc, cur) => acc + cur);
  expect(test).toBe('foobar');
});

test('aggregate on a list with seed', () => {
  const test = aggregate(range(1, 10), 10, (acc, cur) => acc + cur);
  expect(test).toBe(65);
});

test('aggregate on a list with seed and map', () => {
  const test = aggregate(
    range(1, 10),
    10,
    (acc, cur) => acc + cur,
    (x) => x * 100
  );
  expect(test).toBe(6500);
});

test('aggregate on an empty list', () => {
  const test = aggregate([], 10, (acc, cur) => acc + cur);
  expect(test).toBe(10);
});
