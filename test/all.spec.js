import 'regenerator-runtime/runtime';
import { all, range } from '../index.js';

test('all on a list', () => {
  const test = all(range(1, 10));
  expect(test).toBe(true);
});
test('all on an array', () => {
  const test = all(['foo', 'bar']);
  expect(test).toBe(true);
});
test('all with predicate', () => {
  const test = all(range(1, 10), (x) => x < 20);
  expect(test).toBe(true);
});
test('!all with predicate on big list', () => {
  const test = all(range(1, Number.MAX_SAFE_INTEGER), (x) => x < 5);
  expect(test).toBe(false);
});
