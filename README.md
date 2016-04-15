# jinq.js
JavaScript Integrated query

This is still a work in progress

## Methods

- aggregate()
- all()
- any()
- contains()
- count()
- distinct()
- elementAt()
- first()
- groupBy()
- last()
- orderBy()
- select()
- skip()
- take()
- toArray()
- where()

Every method in [`Array.prototype`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype).

- concat()
- copyWithin()
- entries()
- every()
- fill()
- filter()
- find()
- findIndex()
- forEach()
- includes()
- indexOf()
- join()
- keys()
- lastIndexOf()
- map()
- pop()
- push()
- reduce()
- reduceRight()
- reverse()
- shift()
- slice()
- some()
- sort()
- splice()
- toLocaleString()
- toSource()
- toString()
- unshift()
- values()

## Examples

Using `where`, `select` and `groupBy`

	jinq([5,6,3,1,2,9,0,4,7,8])
		.where(function(obj) {
			return obj > 1;
		})
		.select(function(obj) {
			return {
				original: obj,
				multiplied: obj * 2,
				isEven: obj % 2 === 0
			};
		})
		.groupBy(function(obj) {
			return obj.isOdd;
		})
		.toArray();

Using `any` in combination with `where` callback

	jinq([{ group: 'a', name: 'abc' },
          { group: 'a', name: 'def' },
          { group: 'b', name: 'ghi' }])
        .any(function(obj) {
            return obj.group === 'b';
        });

## TODO

- Deferred execution (more linq like)
- add new methods `join`, `union`, `zip`
- optimize `all`, `any`, `first`, `last` functions (break loops)
