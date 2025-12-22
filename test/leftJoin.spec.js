import { leftJoin, rightJoin } from '../src/index.js';

/* LeftJoin */
test('leftJoin on a list', () => {
  const test = leftJoin(
    [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' },
    ],
    [
      { test: '1', from: 1 },
      { test: '2', from: 2 },
      { test: '3', from: 2 },
    ],
    (x) => x.id,
    (x) => x.from,
    (a, b) => `${a.name}: ${b.test ?? 'none'}`
  );
  expect([...test]).toStrictEqual([
    'foo: 1',
    'bar: 2',
    'bar: 3',
    'baz: none',
  ]);
});

/* RightJoin */
test('rightJoin on a list', () => {
  const test = rightJoin(
    [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 2, name: 'baz' },
    ],
    [
      { test: '1', from: 1 },
      { test: '2', from: 2 },
      { test: '3', from: 3 },
    ],
    (x) => x.id,
    (x) => x.from,
    (a, b) => `${a.test}: ${b.name ?? 'none'}`
  );
  expect([...test]).toStrictEqual([
    '1: foo',
    '2: bar',
    '2: baz', 
    '3: none',
  ]);
});
