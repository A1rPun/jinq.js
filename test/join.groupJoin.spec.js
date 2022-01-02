import 'regenerator-runtime/runtime';
import { groupJoin, join, toList } from '../index.js';

/* GroupJoin */
test('groupJoin on a list', () => {
  const test = toList(
    groupJoin(
      [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
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
    )
  );
  expect(test).toStrictEqual(['foo: 13', 'bar: 24']);
});

/* Join */
test('join on a list', () => {
  const test = toList(
    join(
      [
        { id: 1, name: 'foo' },
        { id: 2, name: 'bar' },
      ],
      [
        { test: '1', from: 1 },
        { test: '2', from: 2 },
        { test: '3', from: 1 },
        { test: '4', from: 2 },
      ],
      (x) => x.id,
      (x) => x.from,
      (a, b) => `${a.id} ${a.name}: ${b.test}`
    )
  );
  expect(test).toStrictEqual(['1 foo: 1', '1 foo: 3', '2 bar: 2', '2 bar: 4']);
});
