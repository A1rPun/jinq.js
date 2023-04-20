# jinq.js

JavaScript Integrated Query with Deferred Execution.
Inspired by [LINQ](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=net-6.0)

For vanillajs and nodejs

:page_facing_up: [Wiki](https://github.com/A1rPun/jinq.js/wiki)

- [Installation](#installation)
- [Usage examples](#usage-examples)
- [How jinq deviates from LINQ](#how-jinq-deviates-from-linq)
- [Methods](#methods)
  - [Methods that return a value](#methods-that-return-a-value)
  - [Javascript alternatives](#javascript-alternatives)

### Installation

For now use:

```
$ npm i github:A1rPun/jinq.js
```

Package.json
```json
  "dependencies": {
    "jinq": "github:A1rPun/jinq.js"
  }
```

### Usage examples

Use `jinq.from` to construct an Enumerable from an iterator or an array.

```js
// import { jinq } from 'jinq';

function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const numberText = jinq
  .from(generator())
  .skip(2)
  .take(1)
  .select((n) => `The number: ${n}`)
  .single();

numberText === 'The number: 3'; // true
```

Use `jinq.range` to construct a generated sequence of numbers.

```js
// import { jinq } from 'jinq';

const bigRange = jinq.range(0, Number.MAX_SAFE_INTEGER);

bigRange.any(); // true
bigRange.take(2).toList(); // [0, 1]
```

### How jinq deviates from LINQ

- `EqualityComparer` is a function and not implemented on `distinct`, `except`, `groupBy`, `groupJoin`, `intersect`, `join`, `toHashSet`, `toLookup` , `union`
- `orderBy` & `orderByDescending` use `Array.sort()` internally so it lacks a proper interface
- `aggregate` has the seed as the second parameter because there is no function overloading in JS
- `except`, `intersect`, `groupJoin`, `join` iterates the passed list before producing values
- `groupBy`, `reverse`, `skipLast`, `takeLast` iterates the iterator before producing values
- `tryGetNonEnumeratedCount` returns the count if enumerated, otherwise undefined
- some functions like `count` & `longCount` have the same body
- some functions like `where` don't have expected parameters available in the callback functions

### Methods

- aggregate()
- all()
- any()
- append()
- asEnumerable()
- average()
- chunk()
- concat()
- contains()
- count() // longCount()
- defaultIfEmpty()
- distinct()
- distinctBy()
- elementAt()
- empty()
- except()
- exceptBy()
- first()
- groupBy()
- groupJoin()
- intersect()
- intersectBy()
- join()
- last()
- max()
- maxBy()
- min()
- minBy()
- ofType()
- orderBy()
- orderByDescending()
- prepend()
- range()
- repeat()
- reverse()
- select()
- selectMany()
- sequenceEqual()
- single()
- skip()
- skipLast()
- skipWhile()
- sum()
- take()
- takeLast()
- takeWhile()
- toArray() // toList()
- toDictionary()
- toHashSet()
- toLookup()
- tryGetNonEnumeratedCount()
- union()
- unionBy()
- where()
- zip()

#### Methods that return a value

aggregate, all, any, average, contains, count, elementAt,
first, last, max, maxBy, min, minBy, sequenceEqual, single, sum,
toArray, toDictionary, toHashSet, toList, toLookup

#### Javascript alternatives

- at()
  - elementAt
- concat()
  - concat
- every()
  - all
- filter()
  - where
  - except
- flatMap()
  - selectMany
- includes()
  - contains
- length
  - count
  - longCount
  - tryGetNonEnumeratedCount
- map()
  - select
- push()
  - append
- reduce()
  - aggregate
  - sum
  - min
  - max
  - average
- reverse()
  - reverse
- some()
  - any
- sort()
  - orderBy
  - orderByDescending
- unshift()
  - prepend
