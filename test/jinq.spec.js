import { jinq, Enumerable } from '../index.js';

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

test('jinq static infiniteSequence', () => {
  const test = jinq.infiniteSequence(3, 3).take(3).toList();
  expect(test).toStrictEqual([3, 6, 9]);
});

test('jinq static iterate', () => {
  const test = jinq.iterate(3, x => x + 3).take(3).toList();
  expect(test).toStrictEqual([3, 6, 9]);
});

test('jinq static sequence', () => {
  const test = jinq.sequence(3, 10, 3).take(3).toList();
  expect(test).toStrictEqual([3, 6, 9]);
});

test('jinq static from', () => {
  const test = jinq.from([1, 2]).toList();
  expect(test).toStrictEqual([1, 2]);
});

test('jinq static from string', () => {
  const test = jinq.from('foobar').skip(3).toList();
  expect(test).toStrictEqual(['b', 'a', 'r']);
});

test('jinq static from object', () => {
  const test = jinq.from({ foo: 1, bar: 2 })
    .select(([key, value]) => `${value}${key}`)
    .toList();
  expect(test).toStrictEqual(['1foo', '2bar']);
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

test('jinq state count before toList', () => {
  const test = jinq.range(1, 2);
  expect(test.count()).toBe(2);
  expect(test.toList()).toStrictEqual([1, 2]);
});

test('jinq state first before toList', () => {
  const test = jinq.from([1, 2]);
  expect(test.first()).toBe(1);
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

test('jinq extend Enumerable', () => {
  jinq.prototype.forEach = function (callback) {
    for (const element of this.sequence) callback(element);
  };
  const test = jinq.from([1]).forEach((x) => {
    expect(x).toBe(1);
  });
  expect(test).toBe(undefined);
});
