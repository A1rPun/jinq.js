import 'regenerator-runtime/runtime';
import { range, selectMany, toList } from '../index.js';

test('selectMany flatten', () => {
  const test = toList(selectMany([range(1, 5), range(1, 5)]));
  expect(test).toStrictEqual([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
});
test('selectMany map', () => {
  const test = toList(
    selectMany([{ list: range(1, 5) }, { list: range(1, 5) }], (x) => x.list)
  );
  expect(test).toStrictEqual([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
});
test('selectMany map and select', () => {
  const test = toList(
    selectMany(
      [
        { test: '1', list: [1, 2] },
        { test: '2', list: [3, 4] },
      ],
      (x) => x.list,
      (x, n) => `Test ${x.test}: ${n}`
    )
  );
  expect(test).toStrictEqual([
    'Test 1: 1',
    'Test 1: 2',
    'Test 2: 3',
    'Test 2: 4',
  ]);
});
