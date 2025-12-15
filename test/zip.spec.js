import { range, zip } from '../src/index.js';

test('zip two lists', () => {
  const test = zip(range(1, 3), range(1, 3));
  expect([...test]).toStrictEqual([
    [1, 1],
    [2, 2],
    [3, 3],
  ]);
});

test('zip two lists with select', () => {
  const test = zip(range(1, 3), range(1, 3), (a, b) => `${a}-${b}`);
  expect([...test]).toStrictEqual(['1-1', '2-2', '3-3']);
});

test('zip two uneven lists', () => {
  const test = zip(range(1, 2), range(1, 1));
  expect([...test]).toStrictEqual([
    [1, 1],
    [2, undefined],
  ]);
});

test('zip two uneven lists', () => {
  const test = zip(range(1, 1), range(1, 2));
  expect([...test]).toStrictEqual([
    [1, 1],
    [undefined, 2],
  ]);
});

test('zip on big list', () => {
  const test = zip(range(0, Number.MAX_SAFE_INTEGER), range(0, Number.MAX_SAFE_INTEGER));
  expect(test.next().value).toStrictEqual([0, 0]);
});
