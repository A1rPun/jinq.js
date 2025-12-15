import { range, repeat, selectMany } from '../src/index.js';

test('selectMany flatten', () => {
  const test = selectMany([range(1, 5), range(1, 5)]);
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
});

test('selectMany map', () => {
  const test = selectMany(
    [{ list: range(1, 5) }, { list: range(1, 5) }],
    (x) => x.list
  );
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
});

test('selectMany map and select', () => {
  const test = selectMany(
    [
      { test: '1', list: [1, 2] },
      { test: '2', list: [3, 4] },
    ],
    (x) => x.list,
    (x, n) => `Test ${x.test}: ${n}`
  );
  expect([...test]).toStrictEqual([
    'Test 1: 1',
    'Test 1: 2',
    'Test 2: 3',
    'Test 2: 4',
  ]);
});

test('selectMany empty list', () => {
  const test = selectMany([[], []]);
  expect([...test]).toStrictEqual([]);
});

test('selectMany on big list', () => {
  const test = selectMany(repeat([1, 2, 3], Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toBe(1);
});

test('selectMany predicate has index', () => {
  const test = selectMany([[0, 1], [2, 3]], (x, i) => i ? x : [] );
  expect([...test]).toStrictEqual([2, 3]);
});
