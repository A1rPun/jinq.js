﻿import 'regenerator-runtime/runtime';
import { defaultIfEmpty, empty, first, range, toList } from '../index.js';

test('defaultIfEmpty on an empty list', () => {
  const test = toList(defaultIfEmpty(empty(), 29));
  expect(test).toStrictEqual([29]);
});
test('defaultIfEmpty on a big list', () => {
  const test = first(defaultIfEmpty(range(0, Number.MAX_SAFE_INTEGER), 29));
  expect(test).toBe(0);
});