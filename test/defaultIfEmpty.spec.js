import 'regenerator-runtime/runtime';
import { defaultIfEmpty, first, range } from '../src/index.js';

test('defaultIfEmpty on an empty list', () => {
  const test = defaultIfEmpty([], 29);
  expect([...test]).toStrictEqual([29]);
});

test('defaultIfEmpty on a big list', () => {
  const test = first(defaultIfEmpty(range(0, Number.MAX_SAFE_INTEGER), 29));
  expect(test).toBe(0);
});

test('defaultIfEmpty no default value', () => {
  const test = defaultIfEmpty([]);
  expect([...test]).toStrictEqual([undefined]);
});

test('!defaultIfEmpty not empty', () => {
  const test = defaultIfEmpty([1, 2]);
  expect([...test]).toStrictEqual([1, 2]);
});
