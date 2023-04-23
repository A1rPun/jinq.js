import 'regenerator-runtime/runtime';
import { cast, range, select } from '../src/index.js';

test('cast a list of numbers to strings', () => {
  const test = cast(range(1, 3), String);
  expect([...test]).toStrictEqual(['1', '2', '3']);
});

test('cast a list of strings to numbers', () => {
  const test = cast(select(range(1, 3), (x) => `${x}`), Number);
  expect([...test]).toStrictEqual([1, 2, 3]);
});

test('cast a list of numbers to boolean', () => {
  const test = cast(range(0, 2), Boolean);
  expect([...test]).toStrictEqual([false, true, true]);
});
