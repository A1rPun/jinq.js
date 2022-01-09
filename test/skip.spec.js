import 'regenerator-runtime/runtime';
import { range, skip, skipLast, skipWhile } from '../index.js';

/* Skip */
test('skip first 3 of a list', () => {
  const test = skip(range(1, 5), 3);
  expect([...test]).toStrictEqual([4, 5]);
});

test('skip empty list', () => {
  const test = skip([], Number.MAX_SAFE_INTEGER);
  expect([...test]).toStrictEqual([]);
});

/* SkipLast */
test('skipLast 3 of a list', () => {
  const test = skipLast(range(1, 5), 3);
  expect([...test]).toStrictEqual([1, 2]);
});

test('skipLast empty list', () => {
  const test = skipLast([], Number.MAX_SAFE_INTEGER);
  expect([...test]).toStrictEqual([]);
});

/* SkipWhile */
test('skip while', () => {
  const test = skipWhile(range(1, 5), (x) => x < 3);
  expect([...test]).toStrictEqual([3, 4, 5]);
});

test('skipWhile empty list', () => {
  const test = skipWhile([]);
  expect([...test]).toStrictEqual([]);
});
