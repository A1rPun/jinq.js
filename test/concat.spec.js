import { concat, range } from '../src/index.js';

test('concat a list', () => {
  const test = concat(range(1, 3), range(4, 3));
  expect([...test]).toStrictEqual([1, 2, 3, 4, 5, 6]);
});

test.skip('concat nothing', () => {
  const test = concat();
  expect([...test]).toStrictEqual([]);
});

test('concat big list', () => {
  const test = concat(range(0, Number.MAX_SAFE_INTEGER), range(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toBe(0);
});
