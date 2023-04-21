import 'regenerator-runtime/runtime';
import { distinct, distinctBy ,repeat } from '../src/index.js';

/* Distinct */
test('distinct on a list', () => {
  const test = distinct(repeat(1, 3));
  expect([...test]).toStrictEqual([1]);
});

test('distinct on an array', () => {
  const test = distinct([1, 1, 2, 3, 4, 4, 5]);
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5]);
});

test('distinct on an array of objects', () => {
  const obj = { 1: 1 };
  const test = distinct([obj, obj, { 2: 2 }]);
  expect([...test]).toStrictEqual([obj, { 2: 2 }]);
});

test('distinct on big list', () => {
  const test = distinct(repeat(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toBe(0);
});

/* DistinctBy */
test('distinctBy on a list', () => {
  const test = distinctBy(repeat(1, 3));
  expect([...test]).toStrictEqual([1]);
});

test('distinctBy with selector', () => {
  const test = distinctBy(repeat({ id: 1 }, 3), (x) => x.id);
  expect([...test]).toStrictEqual([{ id: 1 }]);
});
