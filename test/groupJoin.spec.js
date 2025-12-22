import { groupJoin } from '../src/index.js';

test('groupJoin on a list', () => {
  const test = groupJoin(
    [
      { id: 0, name: 'foo' },
      { id: 1, name: 'bar' },
    ],
    [
      { test: '1', from: 'foo' },
      { test: '2', from: 'bar' },
      { test: '3', from: 'foo' },
      { test: '4', from: 'bar' },
    ],
    (x) => x.name,
    (x) => x.from,
    (a, b) => `${a.name}: ${b.map((x) => x.test).join('')}`
  );
  expect([...test]).toStrictEqual(['foo: 13', 'bar: 24']);
});

test('groupJoin on a non distinct list', () => {
  const test = groupJoin(
    [
      { id: 0, name: 'foo' },
      { id: 1, name: 'foo' },
    ],
    [
      { test: '1', from: 'foo' },
      { test: '2', from: 'foo' },
      { test: '3', from: 'foo' },
      { test: '4', from: 'foo' },
    ],
    (x) => x.name,
    (x) => x.from,
    (a, b) => `${a.name}: ${b.map((x) => x.test).join('')}`
  );
  expect([...test]).toStrictEqual(['foo: 1234']);
});

test('!groupJoin not found', () => {
  const test = groupJoin(
    [
      { id: 0 },
      { id: 1 },
    ],
    [
      { test: 1 },
    ],
    (x) => x.id,
    (x) => x.test
  );
  expect([...test]).toStrictEqual([[{ id: 1 }, [{ test: 1 }]]]);
});
