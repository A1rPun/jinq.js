# jinq.js
JavaScript Integrated Query with Deferred Execution

### Methods

- aggregate()
- all()
- any()
- average()
- concat()
- contains()
- count()
- distinct()
- elementAt() // elementAtOrDefault
- except()
- first() // firstOrDefault
- groupBy()
- groupJoin()
- intersect()
- join()
- last() // lastOrDefault
- max()
- min()
- orderBy()
- reverse()
- select()
- selectMany()
- single() // singleOrDefault
- skip()
- skipWhile()
- sum()
- take()
- takeWhile()
- toArray() // toList
- toDictionary()
- toLookup()
- union()
- where()
- zip()

### Static Methods
- jinq.empty() 
- jinq.range()
- jinq.repeat()

### Examples

Construct a new enumeration object

    var source = [5,6,3,1,2,9,0,4,7,8];
    var ints = jinq(source);

Using `where`, `select` and `groupBy`

    ints.where(function(o) {
            return o > 1;
        })
        .select(function(o) {
            return {
                original: o,
                multiplied: o * 2,
                isEven: o % 2 === 0
            };
        })
        .groupBy(function(o) {
            return o.isEven;
        })
        .toArray();

**Output:**

	[{
		key: false,
		value: [
			{ original: 5, multiplied: 10, isEven: false },
			{ original: 3, multiplied: 6, isEven: false },
			{ original: 9, multiplied: 18, isEven: false },
			{ original: 7, multiplied: 14, isEven: false }
		]
	}, {
		key: true,
		value: [
			{ original: 6, multiplied: 12, isEven: true },
			{ original: 2, multiplied: 4, isEven: true },
			{ original: 4, multiplied: 8, isEven: true },
			{ original: 8, multiplied: 16, isEven: true }
		]
	}];

Using `any` in combination with `where` callback

	jinq([{ group: 'a', name: 'abc' },
          { group: 'a', name: 'def' },
          { group: 'b', name: 'ghi' }])
        .any(function(obj) {
            return obj.group === 'b';
        });

**Output:**

	true;

### TODO

- :link: Add new methods
    - defaultIfEmpty?
    - asEnumerable?
    - asParallel?
    - cast?
    - ofType?
    - sequenceEqual?

- :page_facing_up: Add unit tests
- :thumbsup: Distribution :)
