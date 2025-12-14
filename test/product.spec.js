import 'regenerator-runtime/runtime';
import { range, product } from '../src/index.js';

test('product of a list', () => {
  const test = product(range(1, 5));
  expect(test).toBe(120);
});

test('product of an array', () => {
  const test = product([9, 9]);
  expect(test).toBe(81);
});

test('product of floats', () => {
  const test = product([4.1, 2.0, 1.7]);
  expect(test).toBe(13.939999999999998);
});

test('product of an empty array', () => {
  const test = product([]);
  expect(test).toBe(1);
});
