import 'regenerator-runtime/runtime';
import { jinq } from '../jinq.js';

test('jinq static empty', () => {
  const test = jinq.empty().toList();
  expect(test).toStrictEqual([]);
});

test('jinq static range', () => {
  const test = jinq.range(1, 2).toList();
  expect(test).toStrictEqual([1, 2]);
});

test('jinq static repeat', () => {
  const test = jinq.repeat(1, 2).toList();
  expect(test).toStrictEqual([1, 1]);
});

test('jinq static from', () => {
  const test = jinq.from([1, 2]).toList();
  expect(test).toStrictEqual([1, 2]);
});

test('jinq static interface', () => {
  expect(jinq.empty()).toStrictEqual(new jinq());
  expect(jinq.range(1, 0)).toStrictEqual(new jinq());
  expect(jinq.repeat(1, 0)).toStrictEqual(new jinq());
  expect(jinq.from()).toStrictEqual(new jinq());
});

test('jinq state', () => {
  const test = jinq.range(1, 2)
  expect(test.count()).toBe(2);
  expect(test.toList()).toStrictEqual([1, 2]);
});

test('jinq deep state', () => {
  const test = jinq.range(1, 10)
  expect(test.count()).toBe(10);
  expect(test.take(2).toList()).toStrictEqual([1, 2]);
});

test('jinq modify state', () => {
  const test = jinq.range(1, 10);
  test.take(2).toList();
  expect(test.count()).toBe(10);
});
