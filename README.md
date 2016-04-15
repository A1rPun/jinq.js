#jinq.js
JavaScript Integrated query

##Examples

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

##TODO

- add new methods `aggregate`, `distinct`, `except`, `join`, `union`, `zip`
- support native array function calls for chain (ex: `concat`, `reverse`)
- optimize `all`, `any`, `first`, `last` functions (break loops)
