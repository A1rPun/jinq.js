import 'regenerator-runtime/runtime';
import { range, take, takeLast, takeWhile } from '../index.js';

/* Take */
test('take first 3 of a list', () => {
  const test = [...take(range(1, 5), 3)];
  expect(test.length).toBe(3);
  expect(test).toStrictEqual([1, 2, 3]);
});

test('take empty list', () => {
  const test = take([], Number.MAX_SAFE_INTEGER);
  expect([...test]).toStrictEqual([]);
});

test('take modify state', () => {
  const gen = range(1, 5);
  const test = take(gen, 2);
  expect([...test]).toStrictEqual([1, 2]);
  expect([...gen]).toStrictEqual([3, 4, 5]);
});

/* TakeLast */
test('takeLast 3 of a list', () => {
  const test = takeLast(range(1, 5), 3);
  expect([...test]).toStrictEqual([3, 4, 5]);
});

test('takeLast empty list', () => {
  const test = takeLast([], Number.MAX_SAFE_INTEGER);
  expect([...test]).toStrictEqual([]);
});

/* TakeWhile */
test('takeWhile', () => {
  const test = takeWhile(range(1, 5), (x) => x < 3);
  expect([...test]).toStrictEqual([1, 2]);
});

test('takeWhile empty list', () => {
  const test = takeLast([]);
  expect([...test]).toStrictEqual([]);
});
