(function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else {
        var noConflict = this[name];
        this[name] = definition();
        if (noConflict) this[name].noConflict = noConflict;
    }
}('jinq', function () {
    function Enumerable(arr) {
        this._data = arr;
    }
    Enumerable.prototype = {
        aggregate: function (aggregateCallback, seed) {
            var me = this;
            var result = seed === 0 ? 0 : seed || null;
            var i = 0;
            var l = me._data.length;
            if (l == 0)
                return result;
            if (result === null) {
                result = me._data[0];
                i = 1;
            }
            for (l = me._data.length; i < l; i++) {
                var obj = me._data[i];
                result = aggregateCallback.call(me._data, result, obj, i);
            }
            return result;
        },
        all: function (whereCallback) {
            for (var i = 0, l = this._data.length; i < l; i++)
                if (!whereCallback.call(this._data, this._data[i], i))
                    return false;
            return true;
        },
        any: function (whereCallback) {
            return !!this.first(whereCallback);
        },
        concat: function (arr) {
            var me = this;
            me._data = me._data.concat.apply(me._data, arr);
            return me;
        },
        contains: function (val) {
            return this._data.indexOf(val) !== -1;
        },
        count: function (whereCallback) {
            return this.toArray(whereCallback).length;
        },
        distinct: function (distinctCallback) {
            var me = this;
            var result = [];
            var lookup = {};            
            for (var i = 0, l = me._data.length; i < l; i++) {
                var obj = me._data[i];
                var key = distinctCallback ? distinctCallback.call(me._data, obj, i) : obj;
                if (lookup[key]) continue;
                lookup[key] = true;
                result.push(obj);
            }
            me._data = result;
            return me;
        },
        elementAt: function (index) {
            var result = this.toArray();
            return index < result.length ? result[index] : null;
        },
        except: function (arr, distinctCallback) {
            var me = this;
            var result = [];
            var lookup = {};
            var i = 0;
            var l = arr.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = arr[i];
                key = distinctCallback ? distinctCallback.call(arr, obj, i) : obj;
                lookup[key] = true;
            }
            i = 0;
            l = me._data.length;
            for (; i < l; i++) {
                obj = me._data[i];
                key = distinctCallback ? distinctCallback.call(me._data, obj, i) : obj;
                if (!lookup[key])
                    result.push(obj);
            }
            me._data = result;
            return me;
        },
        first: function (whereCallback) {
            var result = this.toArray(whereCallback);
            var length = result.length;
            return length ? result[0] : null;
        },
        groupBy: function (groupCallback) {
            var me = this;
            var result = [];
            var lookup = {};
            for (var i = 0, l = me._data.length; i < l; i++) {
                var obj = me._data[i];
                var group = groupCallback.call(me._data, obj, i);
                if (lookup[group]) {
                    lookup[group].push(obj);
                } else {
                    var value = [obj];
                    lookup[group] = value;
                    result.push({ key: group, value: value });
                }
            }
            me._data = result;
            return me;
        },
        intersect: function (arr, distinctCallback) {
            var me = this;
            var result = [];
            var lookup = {};
            var i = 0;
            var l = arr.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = arr[i];
                key = distinctCallback ? distinctCallback.call(arr, obj, i) : obj;
                lookup[key] = true;
            }
            i = 0;
            l = me._data.length;
            for (; i < l; i++) {
                obj = me._data[i];
                key = distinctCallback ? distinctCallback.call(me._data, obj, i) : obj;
                if (lookup[key])
                    result.push(obj);
            }
            me._data = result;
            return me;
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
            var me = this;
            var result = [];
            for (var i = me._data.length; i--;)
                result.push(me._data[i]);            
            me._data = result;
            return me;
        },
        select: function (selectCallback) {
            var me = this;
            var result = [];
            for (var i = 0, l = me._data.length; i < l; i++) {
                var obj = me._data[i];
                var newObj = selectCallback.call(me._data, obj, i);
                result.push(newObj);
            }
            me._data = result;
            return me;
        },
        selectMany: function (selectCallback) {
            var me = this;
            var result = [];
            for (var i = 0, l = me._data.length; i < l; i++) {
                var obj = me._data[i];
                var newObj = selectCallback.call(me._data, obj, i);
                result.concat(newObj);
            }
            me._data = result;
            return me;
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
        union: function (arr, distinctCallback) {
            var me = this;
            var result = [];
            var lookup = {};
            var i = 0;
            var l = me._data.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = me._data[i];
                key = distinctCallback ? distinctCallback.call(me._data, obj, i) : obj;
                if (!lookup[key]) {
                    lookup[key] = true;
                    result.push(obj);
                }
            }
            i = 0;
            l = arr.length;
            for (; i < l; i++) {
                obj = arr[i];
                key = distinctCallback ? distinctCallback.call(arr, obj, i) : obj;
                if (!lookup[key]) {
                    lookup[key] = true;
                    result.push(obj);
                }
            }
            me._data = result;
            return me;
        },
        where: function (whereCallback) {
            var me = this;
            var result = [];
            for (var i = 0, l = me._data.length; i < l; i++) {
                var obj = me._data[i];
                if (whereCallback.call(me._data, obj, i))
                    result.push(obj);
            }
            me._data = result;
            return me;
        },
        zip: function (arr, selectCallback) {
            var me = this;
            var result = [];
            var sourceLength = me._data.length;
            var destLength = arr.length;
            var l = sourceLength < destLength ? sourceLength : destLength;
            for (var i = 0; i < l; i++) {
                var sourceObj = me._data[i];
                var destObj = arr[i];
                var newObj = selectCallback.call(me._data, sourceObj, destObj, i);
                result.push(newObj);
            }
            me._data = result;
            return me;
        }
    };
    return function (arr) {
        return new Enumerable(arr);
    };
}));
