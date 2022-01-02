import 'regenerator-runtime/runtime';
import { contains, range } from '../index.js';

test('contains 29 in a big list', () => {
  const test = contains(range(1, Number.MAX_SAFE_INTEGER), 29);
  expect(test).toBe(true);
});
test('!contains 29 in a list', () => {
  const test = contains(range(1, 5), 29);
  expect(test).toBe(false);
});
