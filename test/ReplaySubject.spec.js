import { ReplaySubject } from '../src/ReplaySubject.js';

function* simple() {
  yield 0;
  yield 1;
}

function* relay(it) {
  yield* it;
}

test('ReplaySubject function iterator', () => {
  const iterator = simple();
  const test = new ReplaySubject(iterator);
  const replay = test[Symbol.iterator]();

  expect(test.sequence).toBe(iterator);
  expect(test.values).toStrictEqual([]);

  let nextValue = replay.next();
  expect(nextValue).toEqual({ done: false, value: 0 });

  nextValue = replay.next();
  expect(test.values).toStrictEqual([0, 1]);

  nextValue = replay.next();
  expect(nextValue).toEqual({ done: true });
});

test('ReplaySubject copy iterator', () => {
  const iterator = simple();
  const test = new ReplaySubject(iterator);
  const replay = relay(test);
  let nextValue = replay.next();
  expect(nextValue).toEqual({ done: false, value: 0 });

  const test2 = new ReplaySubject(replay);
  const replay2 = relay(test2);
  nextValue = replay2.next();
  expect(nextValue).toEqual({ done: false, value: 1 });

  expect(test.done).toBe(false);
  expect(test2.done).toBe(false);
  expect(test.values).toStrictEqual([0, 1]);
  expect(test2.values).toStrictEqual([1]);
  expect([...test]).toStrictEqual([0, 1]);
  expect([...test2]).toStrictEqual([1]);
  expect(test.done).toBe(true);
  expect(test2.done).toBe(true);
});

test('ReplaySubject replays values', () => {
  const iterator = simple();
  const test = new ReplaySubject(iterator);

  expect([...test]).toStrictEqual([0, 1]);
  expect(test.values).toStrictEqual([0, 1]);
  expect([...test]).toStrictEqual([0, 1]);
});

test('ReplaySubject array iterator', () => {
  expect(new ReplaySubject([]).done).toBe(true);
});

test('ReplaySubject string iterator', () => {
  expect(new ReplaySubject('foobar').done).toBe(false);
});

test('ReplaySubject Map iterator', () => {
  expect(new ReplaySubject(new Map()).done).toBe(false);
});

test('ReplaySubject object iterator', () => {
  expect(new ReplaySubject({}).done).toBe(false);
});

test('ReplaySubject empty iterator', () => {
  expect(new ReplaySubject().sequence).toStrictEqual([]);
});
