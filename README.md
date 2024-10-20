﻿# jinq.js

JavaScript Integrated Query for generators and arrays.
Inspired by [LINQ](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable)

For JavaScript and NodeJs

- [Installation](#installation)
- [Usage examples](#usage-examples)
- [How jinq deviates from LINQ](#how-jinq-deviates-from-linq)
- [Enumerable methods](#enumerable-methods)
  - [Static methods](#static-methods)

### Installation

For now™ use:

```shell
$ npm i github:A1rPun/jinq.js
```

And then import it like:

```js
import { jinq } from 'jinq';
```

### Usage examples

Use `jinq.from` to construct an Enumerable from an iterator or an array.

```js
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
const bigRange = jinq.range(0, Number.MAX_SAFE_INTEGER);

bigRange.any(); // true
bigRange.take(2).toList(); // [0, 1]
```

### How jinq deviates from LINQ

- `IEqualityComparer` is not implemented for most functions that use it
- `IOrderedEnumerable` is not implemented

### Enumerable methods

JavaScript has numerous built in methods to do operations on arrays, not so much for generators. This library focuses primarely on generators because of the lazy loading with yields.

Method|Returns value|Description|JS alternative
--|--|--|--
aggregate()|:white_check_mark:||Array.reduce()
aggregateBy()|:white_check_mark:||Array.reduce()
all()|:white_check_mark:||Array.every()
any()|:white_check_mark:||Array.some()
append()|||Array.push()
asEnumerable()|||yield* Iterator
average()|:white_check_mark:||Array.reduce()
cast()||accepts a type as parameter e.g. `String`, `Number` or `Boolean`|Array.map()
chunk()|||-
concat()|||Array.concat()
contains()|:white_check_mark:||Array.includes()
count()|:white_check_mark:||Array.length
countBy()|:white_check_mark:||Array.reduce()
defaultIfEmpty()|||Array.length ? Array : [defaultValue]
distinct()|||-
distinctBy()|||-
elementAt()|:white_check_mark:|can throw an error|Array.at() ?? throw new Error()
elementAtOrDefault()|:white_check_mark:||Array.at() ?? defaultValue
except()|||Array.filter()
exceptBy()|||Array.filter()
first()|:white_check_mark:|can throw an error|Array.at(0) ?? throw new Error()
firstOrDefault()|:white_check_mark:||Array.at(0) ?? defaultValue
groupBy()|||-
groupJoin()|||-
intersect()|||-
intersectBy()|||-
join()|||-
last()|:white_check_mark:|can throw an error|Array.at(-1) ?? throw new Error()
lastOrDefault()|:white_check_mark:||Array.at(-1) ?? defaultValue
longCount()|:white_check_mark:||Array.length
max()|:white_check_mark:||Array.reduce()
maxBy()|:white_check_mark:||Array.reduce()
min()|:white_check_mark:||Array.reduce()
minBy()|:white_check_mark:||Array.reduce()
ofType()|||Array.filter()
order()||doesn't return an IOrderedEnumerable|Array.sort()
orderBy()||doesn't return an IOrderedEnumerable|Array.sort()
orderByDescending()||doesn't return an IOrderedEnumerable|Array.sort()
prepend()|||Array.unshift()
reverse()|||Array.reverse()
select()|||Array.map()
selectMany()|||Array.flatMap()
sequenceEqual()|:white_check_mark:||Array.all()
single()|:white_check_mark:|can throw an error|Array.at(index) ?? throw new Error()
singleOrDefault()|||Array.at(index) ?? defaultValue
skip()|||Array.slice()
skipLast()|||Array.slice()
skipWhile()|||Array.slice()
sum()|:white_check_mark:||Array.reduce()
take()|||Array.slice()
takeLast()|||Array.slice()
takeWhile()|||Array.slice()
toArray()|:white_check_mark:||[...Iterator]
toDictionary()|:white_check_mark:||new Map(Array)
toHashSet()|:white_check_mark:||new Set(Array)
toList()|:white_check_mark:|same as toArray()|[...Iterator]
toLookup()|:white_check_mark:||new Map(Array)
tryGetNonEnumeratedCount()|:white_check_mark:| returns the count if enumerated, otherwise undefined|Array.length
union()|||-
unionBy()|||-
where()|||Array.filter()
zip()|||-

#### Static methods

- jinq.empty()
- jinq.from()
- jinq.range()
- jinq.repeat()
