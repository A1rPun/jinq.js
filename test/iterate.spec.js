import { iterate, take } from '../src/index.js';

test('iterate of an integer', () => {
  const test = take(iterate(42, (v) => v + 3), 3);
  expect([...test]).toStrictEqual([42, 45, 48]);
});

test('iterate boolean', () => {
  const test = take(iterate(true, (b) => !b), 4);
  expect([...test]).toStrictEqual([true, false, true, false]);
});

test('iterate no selector', () => {
  const test = take(iterate(42), 2);
  expect([...test]).toStrictEqual([42, 42]);
});

test('iterate empty params', () => {
  const test = take(iterate(), 2);
  expect([...test]).toStrictEqual([undefined, undefined]);
});
