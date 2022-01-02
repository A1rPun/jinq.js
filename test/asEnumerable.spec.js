﻿import 'regenerator-runtime/runtime';
import { asEnumerable } from '../index.js';

test('asEnumerable of a list', () => {
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
