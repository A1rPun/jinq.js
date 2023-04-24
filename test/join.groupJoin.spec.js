import 'regenerator-runtime/runtime';
import { groupJoin, join } from '../src/index.js';

/* GroupJoin */
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

/* Join */
test('join on a list', () => {
  const test = join(
    [
      { id: 0, name: 'foo' },
      { id: 1, name: 'bar' },
    ],
    [
      { test: '1', from: 0 },
      { test: '2', from: 1 },
      { test: '3', from: 0 },
      { test: '4', from: 1 },
    ],
    (x) => x.id,
    (x) => x.from,
    (a, b) => `${a.id} ${a.name}: ${b.test}`
  );
  expect([...test]).toStrictEqual([
    '0 foo: 1',
    '0 foo: 3',
    '1 bar: 2',
    '1 bar: 4',
  ]);
});

test('join on a non distinct list', () => {
  const test = join(
    [
      { id: 0, name: 'foo' },
      { id: 0, name: 'bar' },
    ],
    [
      { test: '1', from: 0 },
      { test: '2', from: 0 },
    ],
    (x) => x.id,
    (x) => x.from,
    (a, b) => `${a.id} ${a.name}: ${b.test}`
  );
  expect([...test]).toStrictEqual(['0 foo: 1', '0 foo: 2']);
});

test('!join not found', () => {
  const test = join(
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
  expect([...test]).toStrictEqual([{ id: 1, test: 1 }]);
});
