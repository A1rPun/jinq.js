import 'regenerator-runtime/runtime';
import { select, single, skip, take } from '../index.js';

test('Infinite Fibonacci generator with jinq', () => {
  function* fib(a = 0, b = 1) {
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  const test = single(select(take(skip(fib(), 29), 1), (n) => `Fib: ${n}`));
  expect(test).toBe('Fib: 514229');
});
