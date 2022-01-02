import 'regenerator-runtime/runtime';
import {
  aggregate,
  all,
  any,
  append,
  asEnumerable,
  average,
  chunk,
  concat,
  contains,
  count, // longCount,
  defaultIfEmpty,
  distinct, // distinctBy,
  elementAt, // elementAtOrDefault,
  empty,
  except, // exceptBy,
  first, // firstOrDefault,
  groupBy,
  groupJoin,
  intersect, // intersectBy,
  join,
  last, // lastOrDefault,
  max, // maxBy,
  min, // minBy,
  ofType,
  orderBy,
  orderByDescending,
  prepend,
  range,
  repeat,
  reverse,
  select,
  selectMany,
  sequenceEqual,
  single, // singleOrDefault,
  skip,
  skipLast,
  skipWhile,
  sum,
  take,
  takeLast,
  takeWhile,
  thenBy,
  thenByDescending,
  toDictionary, // toHashSet,
  toList, // toArray,
  toLookup,
  union, // unionBy,
  where,
  zip,
} from '../index.js';

/* Aggregate */
test('aggregate on a list', () => {
  const test = aggregate(range(1, 10), (acc, cur) => acc + cur);
  expect(test).toBe(55);
});
test('aggregate on a list with seed', () => {
  const test = aggregate(range(1, 10), (acc, cur) => acc + cur, 10);
  expect(test).toBe(65);
});
test('aggregate on a list with seed and map', () => {
  const test = aggregate(
    range(1, 10),
    (acc, cur) => acc + cur,
    10,
    (x) => x * 100
  );
  expect(test).toBe(6500);
});

/* All */
test('all on a list', () => {
  const test = all(range(1, 10));
  expect(test).toBe(true);
});
test('all with predicate', () => {
  const test = all(range(1, 10), (x) => x < 20);
  expect(test).toBe(true);
});
test('!all with predicate on big list', () => {
  const test = all(range(1, Number.MAX_SAFE_INTEGER), (x) => x < 5);
  expect(test).toBe(false);
});

/* Any */
test('any on a big list', () => {
  const test = any(range(0, Number.MAX_SAFE_INTEGER));
  expect(test).toBe(true);
});
test('!any on empty list', () => {
  const test = any(empty());
  expect(test).toBe(false);
});
test('any on an array', () => {
  const test = any([1, 2, 3, 4, 5]);
  expect(test).toBe(true);
});
test('!any with predicate', () => {
  const test = any(range(1, 5), (x) => x > 10);
  expect(test).toBe(false);
});

/* Append */
test('append an item to a list', () => {
  const test = toList(append(range(1, 3), 4));
  expect(test).toStrictEqual([1, 2, 3, 4]);
});
test('append multiple items to a list', () => {
  const test = toList(append(range(1, 3), 4, 5));
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});

/* AsEnumerable */
test('asEnumerable of a list', () => {
  const test = asEnumerable([1, 2, 3]);
  let next = test.next();
  expect(next.value).toBe(1);
  next = test.next();
  expect(next.value).toBe(2);
  next = test.next();
  expect(next.value).toBe(3);
  next = test.next();
  expect(next.value).toBe(undefined);
  expect(next.done).toBe(true);
});

/* Average */
test('average a list', () => {
  const test = average(range(1, 9));
  expect(test).toBe(5);
});

/* Chunk */
test('chunk a list', () => {
  const test = toList(chunk(range(1, 6), 2));
  expect(test).toStrictEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
});
test('chunk a list with last chunk different size', () => {
  const test = toList(chunk(range(1, 8), 3));
  expect(test).toStrictEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8],
  ]);
});

/* Count */
test('count a list', () => {
  const test = count(range(1, 10));
  expect(test).toBe(10);
});
test('count an array', () => {
  const test = count([1, 2, 3, 4, 5]);
  expect(test).toBe(5);
});
test('count with predicate', () => {
  const test = count(range(1, 5), (x) => x > 3);
  expect(test).toBe(2);
});

/* Concat */
test('concat a list', () => {
  const test = toList(concat(range(1, 3), range(4, 6)));
  expect(test).toStrictEqual([1, 2, 3, 4, 5, 6]);
});

/* Contains */
test('contains 29 in a big list', () => {
  const test = contains(range(1, Number.MAX_SAFE_INTEGER), 29);
  expect(test).toBe(true);
});
test('!contains 29 in a list', () => {
  const test = contains(range(1, 5), 29);
  expect(test).toBe(false);
});

/* DefaultIfEmpty */
test('defaultIfEmpty on an empty list', () => {
  const test = toList(defaultIfEmpty(empty(), 29));
  expect(test).toStrictEqual([29]);
});
test('defaultIfEmpty on a big list', () => {
  const test = first(defaultIfEmpty(range(0, Number.MAX_SAFE_INTEGER), 29));
  expect(test).toBe(0);
});

/* Distinct */
test('distinct on a list', () => {
  const test = toList(distinct(repeat(1, 3)));
  expect(test).toStrictEqual([1]);
});
test('distinct on an array', () => {
  const test = toList(distinct([1, 1, 2, 3, 4, 4, 5]));
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});
test('distinct on an array of objects', () => {
  const obj = { 1: 1 };
  const test = toList(distinct([obj, obj, { 2: 2 }]));
  expect(test).toStrictEqual([obj, { 2: 2 }]);
});

/* ElementAt */
test('elementAt on big list', () => {
  const test = elementAt(range(0, Number.MAX_SAFE_INTEGER), 10);
  expect(test).toBe(10);
});

/* Empty */
test('empty list', () => {
  const test = toList(empty());
  expect(test).toStrictEqual([]);
});
test('empty result', () => {
  const test = empty().next();
  expect(test.value).toBe(undefined);
  expect(test.done).toBe(true);
});

/* Except */
test('except on a list', () => {
  const test = toList(except(range(1, 5), range(3, 8)));
  expect(test).toStrictEqual([1, 2]);
});

/* GroupBy */
test('groupBy array', () => {
  const test = toList(groupBy([1, 1, 2, 2]));
  expect(test).toStrictEqual([
    { key: '1', value: [1, 1] },
    { key: '2', value: [2, 2] },
  ]);
});
test('groupBy array with grouping', () => {
  const test = toList(groupBy([1, 2, 3, 4, 5, 6], (x) => Math.floor(x / 2)));
  expect(test).toStrictEqual([
    { key: '0', value: [1] },
    { key: '1', value: [2, 3] },
    { key: '2', value: [4, 5] },
    { key: '3', value: [6] },
  ]);
});
test('groupBy array with grouping and select', () => {
  const test = toList(
    groupBy(
      [1, 2, 3, 4, 5, 6],
      (x) => x % 2,
      (x) => x * 100
    )
  );
  expect(test).toStrictEqual([
    { key: '0', value: [200, 400, 600] },
    { key: '1', value: [100, 300, 500] },
  ]);
});

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

/* Intersect */
test('intersect on a list', () => {
  const test = toList(intersect(range(1, 5), range(3, 8)));
  expect(test).toStrictEqual([3, 4, 5]);
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

/* First */
test('first value of a big list', () => {
  const test = first(range(0, Number.MAX_SAFE_INTEGER));
  expect(test).toBe(0);
});
test('first with predicate', () => {
  const test = first(range(1, 5), (x) => x > 3);
  expect(test).toBe(4);
});

/* Last */
test('last value of a list', () => {
  const test = last(range(0, 10));
  expect(test).toBe(10);
});
test('last with predicate', () => {
  const test = last(range(1, 5), (x) => x < 3);
  expect(test).toBe(2);
});

/* Max */
test('max of a list', () => {
  const test = max(range(1, 29));
  expect(test).toBe(29);
});

/* Min */
test('min of a list', () => {
  const test = min(range(1, 10));
  expect(test).toBe(1);
});

/* OfType */
test('ofType on a list', () => {
  const test = toList(ofType(['1', 2, '3', 4, '5'], 'number'));
  expect(test).toStrictEqual([2, 4]);
});

/* OrderBy */
test('orderBy on a list', () => {
  const test = toList(orderBy([2, 1, 3, 5, 4]));
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});

/* OrderByDescending */
test('orderByDescending on a list', () => {
  const test = toList(orderByDescending([2, 1, 3, 5, 4]));
  expect(test).toStrictEqual([5, 4, 3, 2, 1]);
});

/* Prepend */
test('prepend an item to a list', () => {
  const test = toList(prepend(range(2, 4), 1));
  expect(test).toStrictEqual([1, 2, 3, 4]);
});
test('prepend multiple items to a list', () => {
  const test = toList(prepend(range(2, 4), 0, 1));
  expect(test).toStrictEqual([0, 1, 2, 3, 4]);
});

/* Range */
test('range of 5 integers', () => {
  const test = toList(range(1, 5));
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});

/* Repeat */
test('repeats value 29, 3 times', () => {
  const test = toList(repeat(29, 3));
  expect(test).toStrictEqual([29, 29, 29]);
});

/* Reverse */
test('reverse a list', () => {
  const test = toList(reverse(range(1, 5)));
  expect(test).toStrictEqual([5, 4, 3, 2, 1]);
});

/* Select */
test('select default', () => {
  const test = toList(select(range(1, 5)));
  expect(test).toStrictEqual([1, 2, 3, 4, 5]);
});
test('select the value + 1', () => {
  const test = toList(select(range(1, 5), (x) => x + 1));
  expect(test).toStrictEqual([2, 3, 4, 5, 6]);
});

/* SelectMany */
test('selectMany flatten', () => {
  const test = toList(selectMany([range(1, 5), range(1, 5)]));
  expect(test).toStrictEqual([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
});
test('selectMany map', () => {
  const test = toList(
    selectMany([{ list: range(1, 5) }, { list: range(1, 5) }], (x) => x.list)
  );
  expect(test).toStrictEqual([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
});
test('selectMany map and select', () => {
  const test = toList(
    selectMany(
      [
        { test: '1', list: [1, 2] },
        { test: '2', list: [3, 4] },
      ],
      (x) => x.list,
      (x, n) => `Test ${x.test}: ${n}`
    )
  );
  expect(test).toStrictEqual([
    'Test 1: 1',
    'Test 1: 2',
    'Test 2: 3',
    'Test 2: 4',
  ]);
});

/* SequenceEqual */
test('sequenceEqual of list and array', () => {
  const test = sequenceEqual(range(1, 5), [1, 2, 3, 4, 5]);
  expect(test).toBe(true);
});
test('sequenceEqual of two lists', () => {
  const test = sequenceEqual(range(1, 5), range(1, 5));
  expect(test).toBe(true);
});
test('!sequenceEqual of two uneven lists', () => {
  const test = sequenceEqual([1, 2], range(1, 5));
  expect(test).toBe(false);
});
test('!sequenceEqual of two uneven lists', () => {
  const test = sequenceEqual(range(1, Number.MAX_SAFE_INTEGER), [1, 2]);
  expect(test).toBe(false);
});
test('sequenceEqual of two empty lists', () => {
  const test = sequenceEqual(empty(), empty());
  expect(test).toBe(true);
});

/* Single */
test('single value on a list with single value', () => {
  const test = single(range(0, 0));
  expect(test).toBe(0);
});
test('single value on a list with multiple values', () => {
  const test = single(range(1, 3));
  expect(test).toBe(undefined);
});
test('single with predicate', () => {
  const test = single(range(1, 5), (x) => x > 3);
  expect(test).toBe(undefined);
});

/* Skip */
test('skip first 3 of a list', () => {
  const test = toList(skip(range(1, 5), 3));
  expect(test).toStrictEqual([4, 5]);
});

/* SkipLast */
test('skipLast 3 of a list', () => {
  const test = toList(skipLast(range(1, 5), 3));
  expect(test).toStrictEqual([1, 2]);
});

/* SkipWhile */
test('skip while', () => {
  const test = toList(skipWhile(range(1, 5), (x) => x < 3));
  expect(test).toStrictEqual([3, 4, 5]);
});

/* Sum */
test('sum of a list', () => {
  const test = sum(range(1, 10));
  expect(test).toBe(55);
});

/* Take */
test('take first 3 of a list', () => {
  const test = toList(take(range(1, 5), 3));
  expect(test).toStrictEqual([1, 2, 3]);
});

/* TakeLast */
test('takeLast 3 of a list', () => {
  const test = toList(takeLast(range(1, 5), 3));
  expect(test).toStrictEqual([3, 4, 5]);
});

/* TakeWhile */
test('take while', () => {
  const test = toList(takeWhile(range(1, 5), (x) => x < 3));
  expect(test).toStrictEqual([1, 2]);
});

/* ToDictionary */
test('toDictionary from a list', () => {
  const test = toDictionary([1, 1, 2, 2]);
  expect(test).toStrictEqual({ 1: 1, 2: 2 });
});

/* ToLookup */
test('toLookup from a list', () => {
  const test = toLookup([1, 1, 2, 2]);
  expect(test).toStrictEqual({ 1: [1, 1], 2: [2, 2] });
});

/* Union */
test('union of two lists', () => {
  const test = toList(union(range(1, 4), range(1, 4)));
  expect(test).toStrictEqual([1, 2, 3, 4]);
});
test('union of two lists', () => {
  const test = toList(union(range(3, 6), range(1, 4)));
  expect(test).toStrictEqual([3, 4, 5, 6, 1, 2]);
});

/* Where */
test('where every value is smaller than 3', () => {
  const test = toList(where(range(1, 4), (x) => x < 3));
  expect(test).toStrictEqual([1, 2]);
});

/* Zip */
test('zip two lists', () => {
  const test = toList(zip(range(1, 3), range(1, 3)));
  expect(test).toStrictEqual([
    [1, 1],
    [2, 2],
    [3, 3],
  ]);
});
test('zip two lists with select', () => {
  const test = toList(zip(range(1, 3), range(1, 3), (a, b) => `${a}-${b}`));
  expect(test).toStrictEqual(['1-1', '2-2', '3-3']);
});
test('zip two uneven lists', () => {
  const test = toList(zip(range(1, 2), range(1, 1)));
  expect(test).toStrictEqual([
    [1, 1],
    [2, undefined],
  ]);
});
test('zip two uneven lists', () => {
  const test = toList(zip(range(1, 1), range(1, 2)));
  expect(test).toStrictEqual([
    [1, 1],
    [undefined, 2],
  ]);
});

/* jinq Fib */
test('Fib', () => {
  function* fib(a = 0, b = 1) {
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  const test = single(select(take(skip(fib(), 29), 1), (n) => `Fib: ${n}`));
  expect(test).toBe('Fib: 514229');
});
