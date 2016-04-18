(function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else {
        var noConflict = this[name];
        this[name] = definition();
        if (noConflict) this[name].noConflict = noConflict;
    }
}('jinq', function () {
    function enumerable(arr) {
        this._data = arr;
    }
    enumerable.prototype = {
        aggregate: function (aggregateCallback, seed) {
            var result = seed === 0 ? 0 : seed || null;
            var i = 0;
            var l = this._data.length;

            if (l == 0) return result;

            if (result === null) {
                result = this._data[0];
                i = 1;
            }

            for (l = this._data.length; i < l; i++) {
                var obj = this._data[i];
                result = aggregateCallback.call(this._data, result, obj, i);
            }
            return result;
        },
        all: function (whereCallback) {
            return this._data.length === this.count(whereCallback);
        },
        any: function (whereCallback) {
            return !!this.first(whereCallback);
        },
        contains: function (val) {
            return this._data.indexOf(val) !== -1;
        },
        count: function (whereCallback) {
            return this.toArray(whereCallback).length;
        },
        distinct: function (distinctCallback) {
            var result = [];
            var lookup = {};
            var i = 0;
            var l = this._data.length;
            if (distinctCallback) {
                for (; i < l; i++) {
                    var obj = this._data[i];
                    var key = distinctCallback.call(this._data, obj, i);
                    if (lookup[key]) continue;
                    lookup[key] = true;
                    result.push(obj);
                }
            } else {
                for (; i < l; i++) {
                    var obj = this._data[i];
                    if (lookup[obj]) continue;
                    lookup[obj] = true;
                    result.push(obj);
                }
            }
            this._data = result;
            return this;
        },
        elementAt: function (index) {
            var result = this.toArray();
            return index < result.length ? result[index] : null;
        },
        first: function (whereCallback) {
            var result = this.toArray(whereCallback);
            var length = result.length;
            return length ? result[0] : null;
        },
        groupBy: function (groupCallback) {
            var result = [];
            var lookup = {};
            for (var i = 0, l = this._data.length; i < l; i++) {
                var obj = this._data[i];
                var group = groupCallback.call(this._data, obj, i);
                if (lookup[group]) {
                    lookup[group].push(obj);
                } else {
                    var value = [obj];
                    lookup[group] = value;
                    result.push({ key: group, value: value });
                }
            }
            this._data = result;
            return this;
        },
        last: function (whereCallback) {
            var result = this.toArray(whereCallback);
            var length = result.length;
            return length ? result[result.length - 1] : null;
        },
        orderBy: function () {
            var newArr = this._data.slice();
            this._data = newArr.sort.apply(newArr, arguments);
            return this;
        },
        reverse: function () {
            var result = [];
            for (var i = this._data.length; i--;)
                result.push(this._data[i]);            
            this._data = result;
            return this;
        },
        select: function (selectCallback) {
            var result = [];
            for (var i = 0, l = this._data.length; i < l; i++) {
                var obj = this._data[i];
                var newObj = selectCallback.call(this._data, obj, i);
                result.push(newObj);
            }
            this._data = result;
            return this;
        },
        skip: function (num) {
            this._data = this._data.slice(num);
            return this;
        },
        take: function (num) {
            this._data = this._data.slice(0, num);
            return this;
        },
        toArray: function (whereCallback) {
            if (whereCallback)
                this.where(whereCallback);
            return this._data;
        },
        where: function (whereCallback) {
            var result = [];
            for (var i = 0, l = this._data.length; i < l; i++) {
                var obj = this._data[i];
                if (whereCallback.call(this._data, obj, i))
                    result.push(obj);
            }
            this._data = result;
            return this;
        }
    };

    return function jinq(arr) {
        return new enumerable(arr);
    };
}));
