# jinq.js

JavaScript Integrated Query with Deferred Execution.  
Inspired by [LINQ](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=net-6.0)

For vanillajs and nodejs

:page_facing_up: [Wiki](https://github.com/A1rPun/jinq.js/wiki)

### How jinq deviates from LINQ

- `OrDefault` not implemented
- `EqualityComparer` is a function and not implemented on `distinct`, `except`, `groupBy`, `groupJoin`, `intersect`, `join`, `toHashSet`, `toLookup` , `union`
- `orderBy` & `orderByDescending` use `Array.sort()` internally so no OrderedEnumerable (yet?)
- `aggregate` has the seed as the second parameter
- `except`, `intersect`, `groupJoin`, `join` iterates the passed list before producing values
- `groupBy`, `reverse`, `skipLast`, `takeLast` iterates the iterator before producing values
- `tryGetNonEnumeratedCount` returns the count if enumerated, otherwise undefined
- some functions like `count` & `longCount` have the same body

### Examples

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
- count() // longCount
- defaultIfEmpty()
- distinct() // distinctBy
- elementAt()
- empty()
- except() // exceptBy
- first()
- groupBy()
- groupJoin()
- intersect() // intersectBy
- join()
- last()
- max() // maxBy
- min() // minBy
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
- toArray() // toList
- toDictionary()
- toHashSet
- toLookup()
- tryGetNonEnumeratedCount()
- union() // unionBy
- where()
- zip()

#### Methods that return a value

aggregate, all, any, average, contains, count, elementAt,
first, last, max, maxBy, min, minBy, sequenceEqual, single, sum,
toArray, toDictionary, toHashSet, toList, toLookup
