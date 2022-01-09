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

test('jinq tryGetNonEnumeratedCount', () => {
  const test = jinq.range(1, 10);
  expect(test.tryGetNonEnumeratedCount()).toBe(undefined);
  test.take(2).toList();
  expect(test.tryGetNonEnumeratedCount()).toBe(undefined);
  test.toList();
  expect(test.tryGetNonEnumeratedCount()).toBe(10);
});

test('jinq repeat in for of', () => {
  for (const value of jinq.repeat(1, 2)) {
    expect(value).toBe(1);
  }
});

test('jinq repeat twice in for of', () => {
  const test = jinq.repeat(1, 2);

  for (const value of test) {
    expect(value).toBe(1);
  }

  for (const value of test) {
    expect(value).toBe(1);
  }
});

test('jinq state', () => {
  const test = jinq.range(1, 2);
  expect(test.count()).toBe(2);
  expect(test.toList()).toStrictEqual([1, 2]);
});

test('jinq deep state', () => {
  const test = jinq.range(1, 10);
  expect(test.count()).toBe(10);
  expect(test.take(2).toList()).toStrictEqual([1, 2]);
});

test('jinq modify state', () => {
  const test = jinq.range(1, 10);
  test.take(2).toList();
  expect(test.count()).toBe(10);
});
