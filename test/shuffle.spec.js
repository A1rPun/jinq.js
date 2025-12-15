import { random, range, shuffle } from '../src/index.js';

const DEFAULT_SEED = 0;
const OTHER_SEED = 1337;

/* shuffle */
test('shuffle on a list', () => {
  const test = shuffle(range(5, 5), DEFAULT_SEED);
  expect([...test]).toStrictEqual([9, 7, 8, 5, 6]);
});

test('shuffle on an array', () => {
  const test = shuffle([1, 2, 3, 4, 5], DEFAULT_SEED);
  expect([...test]).toStrictEqual([5, 3, 4, 1, 2]);
});

test('shuffle on a list with seed', () => {
  const test = shuffle(range(1, 5), OTHER_SEED);
  expect([...test]).toStrictEqual([4, 2, 3, 5, 1]);
});

test('shuffle on an empty list', () => {
  const test = shuffle([]);
  expect([...test]).toStrictEqual([]);
});

/* random */
test('random on a list', () => {
  const test = random(range(5, 5), DEFAULT_SEED);
  expect(test).toStrictEqual(6);
});

test('random on an array', () => {
  const test = random([1, 2, 3, 4, 5], DEFAULT_SEED);
  expect(test).toStrictEqual(2);
});

test('random on a list with seed', () => {
  const test = random(range(1, 5), OTHER_SEED);
  expect(test).toStrictEqual(1);
});

test('random on an empty list', () => {
  const test = random([]);
  expect(test).toStrictEqual(undefined);
});
