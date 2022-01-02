import 'regenerator-runtime/runtime';
import { jinq } from '../jinq.js';

function* fib(a = 0, b = 1) {
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

test('jinq static empty', () => {
  const test = jinq.empty();
  expect([...test]).toStrictEqual([]);
});

test('jinq static range', () => {
  const test = jinq.range(1, 2);
  expect([...test]).toStrictEqual([1, 2]);
});

test('jinq static repeat', () => {
  const test = jinq.repeat(1, 2);
  expect([...test]).toStrictEqual([1, 1]);
});

test('Infinite Fibonacci generator with jinq chaining', () => {
  // const test = single(select(take(skip(fib(), 29), 1), (n) => `Fib: ${n}`));
  const test = jinq(fib())
    .skip(29)
    .take(1)
    .select((n) => `Fib: ${n}`)
    .single();

  expect(test).toBe('Fib: 514229');
});

test('jinq on README', () => {
  const ints = [5, 6, 3, 1, 2, 9, 0, 4, 7, 8];
  const evenNumbers = jinq(ints)
    .where((x) => x > 1)
    .select((x) => {
      return {
        original: x,
        multiplied: x * 2,
        isEven: x % 2 === 0,
      };
    })
    .groupBy((x) => x.isEven)
    .toList();

  expect(evenNumbers).toStrictEqual([
    {
      key: 'false',
      value: [
        { original: 5, multiplied: 10, isEven: false },
        { original: 3, multiplied: 6, isEven: false },
        { original: 9, multiplied: 18, isEven: false },
        { original: 7, multiplied: 14, isEven: false },
      ],
    },
    {
      key: 'true',
      value: [
        { original: 6, multiplied: 12, isEven: true },
        { original: 2, multiplied: 4, isEven: true },
        { original: 4, multiplied: 8, isEven: true },
        { original: 8, multiplied: 16, isEven: true },
      ],
    },
  ]);
});

test('jinq on README 2', () => {
  const query = jinq([
    { group: 'a', name: 'abc' },
    { group: 'a', name: 'def' },
    { group: 'b', name: 'ghi' },
  ]).any((obj) => obj.group === 'b');
  expect(query).toBe(true);
});
