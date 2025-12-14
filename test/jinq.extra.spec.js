import 'regenerator-runtime/runtime';
import { jinq } from '../index.js';

function* fib(a = 0, b = 1) {
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

test('Infinite Fibonacci generator with jinq chaining', () => {
  // const test = single(select(take(skip(fib(), 29), 1), (n) => `Fib: ${n}`));
  const test = jinq
    .from(fib())
    .skip(29)
    .take(1)
    .select((n) => `Fib: ${n}`)
    .single();

  expect(test).toBe('Fib: 514229');
});

test('jinq on README', () => {
  const ints = [5, 6, 3, 1, 2, 9, 0, 4, 7, 8];
  const evenNumbers = jinq
    .from(ints)
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
      key: false,
      value: [
        { original: 5, multiplied: 10, isEven: false },
        { original: 3, multiplied: 6, isEven: false },
        { original: 9, multiplied: 18, isEven: false },
        { original: 7, multiplied: 14, isEven: false },
      ],
    },
    {
      key: true,
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
  const query = jinq
    .from([
      { group: 'a', name: 'abc' },
      { group: 'a', name: 'def' },
      { group: 'b', name: 'ghi' },
    ])
    .any((x) => x.group === 'b');
  expect(query).toBe(true);
});

test('jinq long chain', () => {
  const test = jinq
    .empty()
    .defaultIfEmpty(1)
    .append(42)
    .prepend('42')
    .concat([29, 29])
    .distinct()
    .union([2, '42', 1337])
    .ofType('number')
    .reverse()
    .except([1])
    .intersect([29, 42, 1337])
    .orderBy()
    .select((x) => x + 1)
    .select((x) => x - 1)
    .where((x) => x > 40)
    .zip([1, 2])
    .skip(1)
    .take(1)
    .toList();

  expect(test).toStrictEqual([[1337, 2]]);
});

test('jinq prime generator', () => {
  const primes = jinq
    .range(2, Number.MAX_SAFE_INTEGER)
    .where((number) =>
      jinq
        .range(2, Math.floor(Math.sqrt(number)) - 1)
        .all((divisor) => number % divisor)
    );

  const firstTenPrimes = primes.take(10);
  expect(firstTenPrimes.count()).toBe(10);
  expect(firstTenPrimes.toList()).toStrictEqual([
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
  ]);

  const primesLessThanHundred = primes.takeWhile((x) => x < 100).toList();
  expect(primesLessThanHundred).toStrictEqual([
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ]);
});
