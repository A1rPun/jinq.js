import 'regenerator-runtime/runtime';
import { scan, range } from '../src/index.js';

test('scan on a list', () => {
  const test = scan(range(1, 5), 0, (acc, cur) => acc + cur);
  expect([...test]).toStrictEqual([1, 3, 6, 10, 15]);
});

test('scan on an array', () => {
  const test = scan(['foo', 'bar'], '', (acc, cur) => acc + cur);
  expect([...test]).toStrictEqual(['foo', 'foobar']);
});

test('scan on a list with seed', () => {
  const test = scan(range(1, 5), 10, (acc, cur) => acc + cur);
  expect([...test]).toStrictEqual([11, 13, 16, 20, 25]);
});

test('scan on an empty list', () => {
  const test = scan([], 10, (acc, cur) => acc + cur);
  expect([...test]).toStrictEqual([]);
});
