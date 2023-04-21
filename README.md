# jinq.js

JavaScript Integrated Query with Deferred Execution.
Inspired by [LINQ](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable)

For vanillajs and nodejs

:page_facing_up: [Wiki](https://github.com/A1rPun/jinq.js/wiki)

- [Installation](#installation)
- [Usage examples](#usage-examples)
- [How jinq deviates from LINQ](#how-jinq-deviates-from-linq)
- [Enumerable methods](#enumerable-methods)
  - [Static methods](#static-methods)
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

- `EqualityComparer` is a function and not implemented on `distinct`, `except`, `groupBy`, `groupJoin`, `intersect`, `join`, `toHashSet`, `toLookup` & `union`
- `except`, `intersect`, `groupJoin`, `join` iterates the passed list before producing values
- `groupBy`, `reverse`, `skipLast`, `takeLast`, `orderBy` & `orderByDescending` iterates the iterator before producing values

### Enumerable methods

Method|Returns value|Description
--|--|--
aggregate()|:white_check_mark:|
all()|:white_check_mark:|
any()|:white_check_mark:|
append()||
asEnumerable()||
average()|:white_check_mark:|
chunk()||
concat()||
contains()|:white_check_mark:|
count()|:white_check_mark:|
defaultIfEmpty()||
distinct()||
distinctBy()||
elementAt()|:white_check_mark:|
elementAtOrDefault()|:white_check_mark:|
except()||
exceptBy()||
first()|:white_check_mark:|
firstOrDefault()|:white_check_mark:|
groupBy()||
groupJoin()||
intersect()||
intersectBy()||
join()||
last()|:white_check_mark:|
lastOrDefault()|:white_check_mark:|
longCount()|:white_check_mark:|
max()|:white_check_mark:|
maxBy()|:white_check_mark:|
min()|:white_check_mark:|
minBy()|:white_check_mark:|
ofType()||
orderBy()||doesn't return an IOrderedEnumerable
orderByDescending()||doesn't return an IOrderedEnumerable
prepend()||
reverse()||
select()||
selectMany()||
sequenceEqual()|:white_check_mark:|
single()|:white_check_mark:|
singleOrDefault()||
skip()||
skipLast()||
skipWhile()||
sum()|:white_check_mark:|
take()||
takeLast()||
takeWhile()||
toArray()|:white_check_mark:|
toDictionary()|:white_check_mark:|
toHashSet()|:white_check_mark:|
toList()|:white_check_mark:|same as toArray()
toLookup()|:white_check_mark:|
tryGetNonEnumeratedCount()|:white_check_mark:| returns the count if enumerated, otherwise undefined
union()||
unionBy()||
where()||
zip()||

#### Static methods

- jinq.empty()
- jinq.from()
- jinq.range()
- jinq.repeat()

#### Javascript alternatives

- Array.at()
  - elementAt
- Array.concat()
  - concat
- Array.every()
  - all
- Array.filter()
  - except
  - where
- Array.flatMap()
  - selectMany
- Array.includes()
  - contains
- Array.length
  - count
  - longCount
  - tryGetNonEnumeratedCount
- Array.map()
  - select
- Array.push()
  - append
- Array.reduce()
  - aggregate
  - average
  - max
  - min
  - sum
- Array.reverse()
  - reverse
- Array.some()
  - any
- Array.sort()
  - orderBy
  - orderByDescending
- Array.unshift()
  - prepend
