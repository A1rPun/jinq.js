import 'regenerator-runtime/runtime';
import { aggregateBy, repeat } from '../src/index.js';

test('aggregateBy on a list', () => {
  const test = aggregateBy(repeat(1, 3), (v) => v, 0, (acc, cur) => acc + cur);
  expect(test).toStrictEqual(new Map([[1, 3]]));
});

test('aggregateBy on an array', () => {
  const test = aggregateBy(
    [
      { foo: 'foo', bar: 0 },
      { foo: 'bar', bar: 0 },
      { foo: 'foo', bar: 1 }
    ],
    (v) => v.bar,
    '',
    (acc, cur) => acc + cur.foo
  );
  expect(test).toStrictEqual(new Map([[0, 'foobar'], [1, 'foo']]));
});

test('aggregateBy on a list with seed', () => {
  const test = aggregateBy(repeat(1, 3), (v) => v, 10, (acc, cur) => acc + cur);
  expect(test).toStrictEqual(new Map([[1, 13]]));
});

test('aggregateBy on an empty list', () => {
  const test = aggregateBy([], (v) => v, 0, (acc, cur) => acc + cur);
  expect(test).toStrictEqual(new Map());
});
