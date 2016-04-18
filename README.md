# jinq.js
JavaScript Integrated query

This is still a work in progress

## Methods

- aggregate()
- all()
- any()
- concat()
- contains()
- count()
- distinct()
- elementAt()
- except()
- first()
- groupBy()
- intersect()
- last()
- orderBy()
- reverse()
- select()
- selectMany()
- skip()
- take()
- toArray()
- union()
- where()
- zip()

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
			return obj.isEven;
		})
		.toArray();

Output:

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

Output:

	true;

## TODO

- Deferred execution (more linq like)
- Add new methods 
	- `join`
	- `sum`, `max`, `min`, `average`
