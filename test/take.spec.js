import 'regenerator-runtime/runtime';
import { range, take, takeLast, takeWhile, toList } from '../index.js';

/* Take */
test('take first 3 of a list', () => {
  const test = toList(take(range(1, 5), 3));
  expect(test).toStrictEqual([1, 2, 3]);
});

/* TakeLast */
test('takeLast 3 of a list', () => {
  const test = toList(takeLast(range(1, 5), 3));
  expect(test).toStrictEqual([3, 4, 5]);
});

/* TakeWhile */
test('take while', () => {
  const test = toList(takeWhile(range(1, 5), (x) => x < 3));
  expect(test).toStrictEqual([1, 2]);
});
