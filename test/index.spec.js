import { range, index } from '../src/index.js';

test('index default', () => {
  const test = index(range(1, 3));
  expect([...test]).toStrictEqual([[0, 1], [1, 2], [2, 3]]);
});

test('index empty list', () => {
  const test = index([]);
  expect([...test]).toStrictEqual([]);
});

test('index on big list', () => {
  const test = index(range(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toStrictEqual([0, 0]);
});
