(function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else {
        var noConflict = this[name];
        this[name] = definition();
        if (noConflict) this[name].noConflict = noConflict;
    }
}('jinq', function () {
    function Enumerable(parent, newQueue) {
        if (parent) {
            this.list = parent.list;
            this.queue = parent.queue.slice();
            newQueue && this.queue.push(newQueue);
        } else {
            this.list = [];
            this.queue = [];
        }
    }
    Enumerable.prototype = {
        __resolveQueue: function () {
            this.list = this.list.slice();
            for (var i = 0, l = this.queue.length; i < l; i++) {
                var c = this.queue[i];
                c[0].apply(this, c[1]);
            }
        },
        __makeOrderBy: function (args, desc) {
            function makeCompare(prop) {
                return desc
                    ? function (a, b) { return a[prop] > b[prop] ? -1 : (b[prop] > a[prop] ? 1 : 0); }
                    : function (a, b) { return a[prop] > b[prop] ? 1 : (b[prop] > a[prop] ? -1 : 0); };
            }
            for (var i = args.length; i--;) {
                var arg = args[i];
                if (typeof arg !== 'function')
                    args[i] = makeCompare(arg);
            }
            return function (a, b) {
                for (var i = 0, l = args.length, c; i < l; i++) {
                    c = args[i](a, b);
                    if (c) return c;
                }
                return 0;
            }
        },
        aggregate: function (aggregateCallback, seed) {
            var me = this;
            me.__resolveQueue();
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
            this.__resolveQueue();
            for (var i = 0, l = this.list.length; i < l; i++)
                if (!whereCallback.call(this.list, this.list[i], i))
                    return false;
            return true;
        },
        any: function (whereCallback) {
            return !!this.first(whereCallback);
        },
        contains: function (val) {
            this.__resolveQueue();
            return this.list.indexOf(val) !== -1;
        },
        count: function (whereCallback) {
            return this.toArray(whereCallback).length;
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
        last: function (whereCallback) {
            var result = this.toArray(whereCallback);
            var length = result.length;
            return length ? result[result.length - 1] : null;
        },
        toArray: function (whereCallback) {
            if (whereCallback)
                this.where(whereCallback);
            this.__resolveQueue();
            return this.list;
        }
    };
    var deferredMethods = {
        concat: function (list) {
            var me = this;
            me.list = me.list.concat.apply(me.list, list);
            return me;
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
        join: function (list, sourceProp, joinProp, selectCallback) {
            var me = this;
            var result = [];
            var lookup = {};
            var i = 0;
            var l = list.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = list[i];
                key = obj[joinProp];
                if (key) lookup[key] = obj;
            }
            i = 0;
            l = me.list.length;
            for (; i < l; i++) {
                obj = me.list[i];
                key = obj[sourceProp];
                if (key) {
                    var joinObj = lookup[key];
                    if (joinObj) {
                        if (selectCallback)
                            obj = selectCallback.call(me.list, obj, lookup[key], i);
                        else
                            for (var prop in joinObj)
                                if (!obj[prop])
                                    obj[prop] = joinObj[prop];
                        result.push(obj);
                    }
                }
            }
            me.list = result;
            return me;
        },
        orderBy: function (a) {
            this.list.sort(a ? this.__makeOrderBy(arguments) : a);
            return this;
        },
        orderByDescending: function (a) {
            this.list.sort(a ? this.__makeOrderBy(arguments, true) : function (a, b) { return a > b ? -1 : (b > a ? 1 : 0); });
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
    for (var prop in deferredMethods) {
        Enumerable.prototype[prop] = (function (fn) {
            return function () {
                this.queue.push();
                return new Enumerable(this, [fn, arguments]);
            }
        }(deferredMethods[prop]));
    }
    return function (list) {
        var enumerable = new Enumerable(null);
        if (Array.isArray(list))
            enumerable.list = list;
        return enumerable;
    };
}));
