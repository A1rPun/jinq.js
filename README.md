# jinq.js

JavaScript Integrated Query with Deferred Execution.  
Inspired by [LINQ](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=net-6.0)

For vanillajs and nodejs

:page_facing_up: [Wiki](https://github.com/A1rPun/jinq.js/wiki)

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
- elementAt() // elementAtOrDefault
- empty()
- except() // exceptBy
- first() // firstOrDefault
- groupBy()
- groupJoin()
- intersect() // intersectBy
- join()
- last() // lastOrDefault
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
- single() // singleOrDefault
- skip()
- skipLast()
- skipWhile()
- sum()
- take()
- takeLast()
- takeWhile()
- toArray() // toList
- toDictionary() // toHashSet
- toLookup()
- union() // unionBy
- where()
- zip()

# Methods that return a value

aggregate, all, any, average, contains, count, elementAt,
first, last, max, maxBy, min, minBy, sequenceEqual, single, sum,
toArray, toDictionary, toHashSet, toList, toLookup

# Methods that need to traverse Enumerable(s) before yielding

except, groupBy, groupJoin, intersect, join, orderBy, orderByDescending,
sequenceEqual, reverse, skipLast, takeLast, zip,
toArray, toDictionary, toHashSet, toList, toLookup

### Examples

Construct a new enumeration object

```js
import { jinq } from 'jinq';

const ints = [5, 6, 3, 1, 2, 9, 0, 4, 7, 8];
```

Using `where`, `select` and `groupBy`

```js
const evenNumbers = jinq(ints)
  .where((x) => x > 1)
  .select((x) => {
    return {
      original: x,
      multiplied: x * 2,
      isEven: x % 2 === 0,
    };
  })
  .groupBy((x) => x.isEven)
  .toList();
```

**Output** `evenNumbers`

```js
[
  {
    key: 'false',
    value: [
      { original: 5, multiplied: 10, isEven: false },
      { original: 3, multiplied: 6, isEven: false },
      { original: 9, multiplied: 18, isEven: false },
      { original: 7, multiplied: 14, isEven: false },
    ],
  },
  {
    key: 'true',
    value: [
      { original: 6, multiplied: 12, isEven: true },
      { original: 2, multiplied: 4, isEven: true },
      { original: 4, multiplied: 8, isEven: true },
      { original: 8, multiplied: 16, isEven: true },
    ],
  },
];
```

Using `any` in combination with `where` callback

```js
const query = jinq([
  { group: 'a', name: 'abc' },
  { group: 'a', name: 'def' },
  { group: 'b', name: 'ghi' },
]).any((obj) => obj.group === 'b');
```

**Output** `query`

`true`

### TODO

- :link: Add new methods

  - orDefault functions
  - orderBy functions like Linq
  - equality comparer

- :page_facing_up: Add more info to the [wiki](https://github.com/A1rPun/jinq.js/wiki)
- :thumbsup: Distribution :)
