import { range, take, takeLast, takeWhile } from '../src/index.js';

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

test('take nothing', () => {
  const test = take(range(1, 3));
  expect([...test]).toStrictEqual([]);
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

test('takeLast nothing', () => {
  const test = takeLast(range(1, 3));
  expect([...test]).toStrictEqual([]);
});

/* TakeWhile */
test('takeWhile', () => {
  const test = takeWhile(range(1, 5), (x) => x < 3);
  expect([...test]).toStrictEqual([1, 2]);
});

test('takeWhile empty list', () => {
  const test = takeWhile([]);
  expect([...test]).toStrictEqual([]);
});

test('takeWhile everything', () => {
  const test = takeWhile(range(1, 3));
  expect([...test]).toStrictEqual([1, 2, 3]);
});
