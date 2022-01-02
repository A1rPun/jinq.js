import 'regenerator-runtime/runtime';
import { first, repeat } from '../index.js';

test('repeats value 29, 3 times', () => {
  const test = repeat(29, 3);
  expect([...test]).toStrictEqual([29, 29, 29]);
});

test('repeats value 29, 0 times', () => {
  const test = repeat(29);
  expect([...test]).toStrictEqual([]);
});

test('repeats a big list', () => {
  const test = first(repeat(29, Number.MAX_SAFE_INTEGER));
  expect(test).toStrictEqual(29);
});
