(function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else {
        var noConflict = this[name];
        this[name] = definition();
        if (noConflict) this[name].noConflict = noConflict;
    }
}('jinq', function () {
    function Enumerable(list) {
        this.list = list;
    }
    Enumerable.prototype = {
        aggregate: function (aggregateCallback, seed) {
            var me = this;
            var result = seed === 0 ? 0 : seed || null;
            var i = 0;
            var l = me.list.length;
            if (l == 0)
                return result;
            if (result === null) {
                result = me.list[0];
                i = 1;
            }
            for (l = me.list.length; i < l; i++) {
                var obj = me.list[i];
                result = aggregateCallback.call(me.list, result, obj, i);
            }
            return result;
        },
        all: function (whereCallback) {
            for (var i = 0, l = this.list.length; i < l; i++)
                if (!whereCallback.call(this.list, this.list[i], i))
                    return false;
            return true;
        },
        any: function (whereCallback) {
            return !!this.first(whereCallback);
        },
        concat: function (list) {
            var me = this;
            me.list = me.list.concat.apply(me.list, list);
            return me;
        },
        contains: function (val) {
            return this.list.indexOf(val) !== -1;
        },
        count: function (whereCallback) {
            return this.toArray(whereCallback).length;
        },
        distinct: function (distinctCallback) {
            var me = this;
            var result = [];
            var lookup = {};            
            for (var i = 0, l = me.list.length; i < l; i++) {
                var obj = me.list[i];
                var key = distinctCallback ? distinctCallback.call(me.list, obj, i) : obj;
                if (lookup[key]) continue;
                lookup[key] = true;
                result.push(obj);
            }
            me.list = result;
            return me;
        },
        elementAt: function (index) {
            var result = this.toArray();
            return index < result.length ? result[index] : null;
        },
        except: function (list, distinctCallback) {
            var me = this;
            var result = [];
            var lookup = {};
            var i = 0;
            var l = list.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = list[i];
                key = distinctCallback ? distinctCallback.call(list, obj, i) : obj;
                lookup[key] = true;
            }
            i = 0;
            l = me.list.length;
            for (; i < l; i++) {
                obj = me.list[i];
                key = distinctCallback ? distinctCallback.call(me.list, obj, i) : obj;
                if (!lookup[key])
                    result.push(obj);
            }
            me.list = result;
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
            for (var i = 0, l = me.list.length; i < l; i++) {
                var obj = me.list[i];
                var group = groupCallback.call(me.list, obj, i);
                if (lookup[group]) {
                    lookup[group].push(obj);
                } else {
                    var value = [obj];
                    lookup[group] = value;
                    result.push({ key: group, value: value });
                }
            }
            me.list = result;
            return me;
        },
        intersect: function (list, distinctCallback) {
            var me = this;
            var result = [];
            var lookup = {};
            var i = 0;
            var l = list.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = list[i];
                key = distinctCallback ? distinctCallback.call(list, obj, i) : obj;
                lookup[key] = true;
            }
            i = 0;
            l = me.list.length;
            for (; i < l; i++) {
                obj = me.list[i];
                key = distinctCallback ? distinctCallback.call(me.list, obj, i) : obj;
                if (lookup[key])
                    result.push(obj);
            }
            me.list = result;
            return me;
        },
        last: function (whereCallback) {
            var result = this.toArray(whereCallback);
            var length = result.length;
            return length ? result[result.length - 1] : null;
        },
        orderBy: function (prop) {
            this.list.sort(prop ? function (a, b) {
                return a[prop] > b[prop] ? 1 : (b[prop] > a[prop] ? -1 : 0);
            } : prop);
            return this;
        },
        reverse: function () {
            var me = this;
            var result = [];
            for (var i = me.list.length; i--;)
                result.push(me.list[i]);            
            me.list = result;
            return me;
        },
        select: function (selectCallback) {
            var me = this;
            var result = [];
            for (var i = 0, l = me.list.length; i < l; i++) {
                var obj = me.list[i];
                var newObj = selectCallback.call(me.list, obj, i);
                result.push(newObj);
            }
            me.list = result;
            return me;
        },
        selectMany: function (selectCallback) {
            var me = this;
            var result = [];
            for (var i = 0, l = me.list.length; i < l; i++) {
                var obj = me.list[i];
                var newObj = selectCallback.call(me.list, obj, i);
                result.concat(newObj);
            }
            me.list = result;
            return me;
        },
        shuffle: function () {
            // Used for testing and card games
            for (var i = this.list.length, j, t; i--;) {
                j = Math.floor(Math.random() * (i + 1));
                t = this.list[i];
                this.list[i] = this.list[j];
                this.list[j] = t;
            }
            return this;
        },
        skip: function (num) {
            this.list = this.list.slice(num);
            return this;
        },
        take: function (num) {
            this.list = this.list.slice(0, num);
            return this;
        },
        toArray: function (whereCallback) {
            if (whereCallback)
                this.where(whereCallback);
            return this.list;
        },
        union: function (list, distinctCallback) {
            var me = this;
            var result = [];
            var lookup = {};
            var i = 0;
            var l = me.list.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = me.list[i];
                key = distinctCallback ? distinctCallback.call(me.list, obj, i) : obj;
                if (!lookup[key]) {
                    lookup[key] = true;
                    result.push(obj);
                }
            }
            i = 0;
            l = list.length;
            for (; i < l; i++) {
                obj = list[i];
                key = distinctCallback ? distinctCallback.call(list, obj, i) : obj;
                if (!lookup[key]) {
                    lookup[key] = true;
                    result.push(obj);
                }
            }
            me.list = result;
            return me;
        },
        where: function (whereCallback) {
            var me = this;
            var result = [];
            for (var i = 0, l = me.list.length; i < l; i++) {
                var obj = me.list[i];
                if (whereCallback.call(me.list, obj, i))
                    result.push(obj);
            }
            me.list = result;
            return me;
        },
        zip: function (list, selectCallback) {
            var me = this;
            var result = [];
            var sourceLength = me.list.length;
            var destLength = list.length;
            var l = sourceLength < destLength ? sourceLength : destLength;
            for (var i = 0; i < l; i++) {
                var sourceObj = me.list[i];
                var destObj = list[i];
                var newObj = selectCallback.call(me.list, sourceObj, destObj, i);
                result.push(newObj);
            }
            me.list = result;
            return me;
        }
    };
    return function (list) {
        return new Enumerable(list);
    };
}));
