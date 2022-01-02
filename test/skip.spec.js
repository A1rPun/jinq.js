import 'regenerator-runtime/runtime';
import { range, skip, skipLast, skipWhile, toList } from '../index.js';

/* Skip */
test('skip first 3 of a list', () => {
  const test = toList(skip(range(1, 5), 3));
  expect(test).toStrictEqual([4, 5]);
});

/* SkipLast */
test('skipLast 3 of a list', () => {
  const test = toList(skipLast(range(1, 5), 3));
  expect(test).toStrictEqual([1, 2]);
});

/* SkipWhile */
test('skip while', () => {
  const test = toList(skipWhile(range(1, 5), (x) => x < 3));
  expect(test).toStrictEqual([3, 4, 5]);
});
