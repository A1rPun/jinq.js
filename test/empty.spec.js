import 'regenerator-runtime/runtime';
import { empty } from '../src/index.js';

test('empty list', () => {
  const test = empty();
  expect([...test]).toStrictEqual([]);
});

test('empty result', () => {
  const test = empty().next();
  expect(test.value).toBe(undefined);
  expect(test.done).toBe(true);
});
