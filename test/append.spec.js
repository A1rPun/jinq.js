﻿import 'regenerator-runtime/runtime';
import { append, empty, range } from '../index.js';

test('append an item to a list', () => {
  const test = append(range(1, 3), 4);
  expect([...test]).toStrictEqual([1, 2, 3, 4]);
});
test('append an item to an array', () => {
  const test = append([1, 2, 3], 4);
  expect([...test]).toStrictEqual([1, 2, 3, 4]);
});
test('append multiple items to a list', () => {
  const test = append(range(1, 3), 4, 5);
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5]);
});
test('append nothing', () => {
  const test = append(empty());
  expect([...test]).toStrictEqual([]);
});
