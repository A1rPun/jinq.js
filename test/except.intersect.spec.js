import 'regenerator-runtime/runtime';
import { except, intersect, range } from '../src/index.js';

/* Except */
test('except on a list', () => {
  const test = except(range(1, 5), range(3, 8));
  expect([...test]).toStrictEqual([1, 2]);
});

test('except on big list', () => {
  const test = except(range(0, Number.MAX_SAFE_INTEGER), [0]);
  expect(test.next().value).toBe(1);
});

/* Intersect */
test('intersect on a list', () => {
  const test = intersect(range(1, 5), range(3, 8));
  expect([...test]).toStrictEqual([3, 4, 5]);
});

test('intersect on big list', () => {
  const test = intersect(range(0, Number.MAX_SAFE_INTEGER), [0]);
  expect(test.next().value).toBe(0);
});
