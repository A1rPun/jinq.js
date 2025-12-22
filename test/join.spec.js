import { join } from '../src/index.js';

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
