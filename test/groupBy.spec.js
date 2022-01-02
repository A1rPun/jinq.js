import 'regenerator-runtime/runtime';
import { groupBy } from '../index.js';

test('groupBy array', () => {
  const test = groupBy([1, 1, 2, 2]);
  expect([...test]).toStrictEqual([
    { key: '1', value: [1, 1] },
    { key: '2', value: [2, 2] },
  ]);
});
test('groupBy array with grouping', () => {
  const test = groupBy([1, 2, 3, 4, 5, 6], (x) => Math.floor(x / 2));
  expect([...test]).toStrictEqual([
    { key: '0', value: [1] },
    { key: '1', value: [2, 3] },
    { key: '2', value: [4, 5] },
    { key: '3', value: [6] },
  ]);
});
test('groupBy array with grouping and select', () => {
  const test = groupBy(
    [1, 2, 3, 4, 5, 6],
    (x) => x % 2,
    (x) => x * 100
  );
  expect([...test]).toStrictEqual([
    { key: '0', value: [200, 400, 600] },
    { key: '1', value: [100, 300, 500] },
  ]);
});
