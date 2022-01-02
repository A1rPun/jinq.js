import 'regenerator-runtime/runtime';
import { aggregate, range } from '../index.js';

test('aggregate on a list', () => {
  const test = aggregate(range(1, 10), (acc, cur) => acc + cur);
  expect(test).toBe(55);
});
test('aggregate on a list with seed', () => {
  const test = aggregate(range(1, 10), (acc, cur) => acc + cur, 10);
  expect(test).toBe(65);
});
test('aggregate on a list with seed and map', () => {
  const test = aggregate(
    range(1, 10),
    (acc, cur) => acc + cur,
    10,
    (x) => x * 100
  );
  expect(test).toBe(6500);
});
