import 'regenerator-runtime/runtime';
import { asEnumerable, range } from '../src/index.js';

test('asEnumerable of an array', () => {
  const test = asEnumerable([1, 2, 3]);
  let next = test.next();
  expect(next.value).toBe(1);
  next = test.next();
  expect(next.value).toBe(2);
  next = test.next();
  expect(next.value).toBe(3);
  next = test.next();
  expect(next.value).toBe(undefined);
  expect(next.done).toBe(true);
});

test('asEnumerable of a list', () => {
  const test = asEnumerable(range(1, 3));
  let next = test.next();
  expect(next.value).toBe(1);
  next = test.next();
  expect(next.value).toBe(2);
  next = test.next();
  expect(next.value).toBe(3);
  next = test.next();
  expect(next.value).toBe(undefined);
  expect(next.done).toBe(true);
});

test('asEnumerable of a big list', () => {
  const test = asEnumerable(range(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toBe(0);
});
