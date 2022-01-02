import 'regenerator-runtime/runtime';
import { average, range } from '../index.js';

test('average a list', () => {
  const test = average(range(1, 9));
  expect(test).toBe(5);
});
test('average of an array', () => {
  const test = average([1, 1, 40]);
  expect(test).toBe(14);
});
test('average of an empty array', () => {
  const test = average([]);
  expect(test).toBe(undefined);
});
