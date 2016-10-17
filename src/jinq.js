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
    // Prototype methods which have no enumerable return types
    Enumerable.prototype = {
        aggregate: function (aggregateCallback, seed) {
            var me = this;
            resolveQueue(me);
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
            var me = this;
            resolveQueue(me);
            whereCallback = createCallback(whereCallback);
            if (!whereCallback) return;
            for (var i = 0, l = me.list.length; i < l; i++)
                if (!whereCallback.call(me.list, me.list[i], i))
                    return false;
            return true;
        },
        any: function (whereCallback) {
            return !!this.first(whereCallback);
        },
        average: function () {
            return this.sum() / this.list.length;
        },
        contains: function (val) {
            resolveQueue(this);
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
        max: function () {
            resolveQueue(this);
            return Math.max.apply(null, this.list);
        },
        min: function () {
            resolveQueue(this);
            return Math.min.apply(null, this.list);
        },
        single: function (whereCallback) {
            var result = this.first(whereCallback);
            return this.list.length === 1 ? result : null;
        },
        sum: function () {
            resolveQueue(this);
            var result = 0;
            for (var i = this.list; i--;)
                result += this.list[i];
            return result;
        },
        toArray: function (whereCallback) {
            if (whereCallback)
                this.queue.push([deferredMethods.where, arguments]);
            resolveQueue(this);
            return this.list;
        },
        toDictionary: function (keyCallback, valueCallback) {
            var me = this;
            resolveQueue(me);
            keyCallback = createCallback(keyCallback);
            valueCallback = createCallback(valueCallback);
            var result = {};
            for (var i = 0, l = me.list.length; i < l; i++) {
                var value = me.list[i];
                var key = keyCallback ? keyCallback(value) : value;
                result[key] = valueCallback ? valueCallback(value) : value;
            }
            return result;
        },
        toLookup: function (keyCallback) {
            resolveQueue(this);
            return toLookup(this.list, keyCallback);
        }
    };
    function createCallback(cb) {
        return typeof cb === 'string' ? function (o) { return o[cb] } : cb;
    }
    function makeOrderBy(args, desc) {
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
    }
    function resolveQueue(enumerable) {
        enumerable.list = enumerable.list.slice();
        for (var i = 0, l = enumerable.queue.length; i < l; i++) {
            var c = enumerable.queue[i];
            c[0].apply(enumerable, c[1]);
        }
    }
    function toLookup(list, keyCallback) {
        var lookup = {};
        keyCallback = createCallback(keyCallback);
        for (var i = 0, l = list.length; i < l; i++) {
            var value = list[i];
            var key = keyCallback ? keyCallback.call(list, value, i) : value;
            if (lookup[key])
                lookup[key].push(value);
            else
                lookup[key] = [value];
        }
        return lookup;
    }
    function makeWhile(list, whileCallback) {
        whileCallback = createCallback(whileCallback);
        for (var i = 0, l = list.length; i < l; i++)
            if (!whileCallback.call(list, list[i], i))
                break;
        return i;
    }
    // These methods will be postponed till the queue needs to be resolved
    var deferredMethods = {
        concat: function (list) {
            this.list = this.list.concat(list);
        },
        defaultIfEmpty: function (defaultValue) {
            if (!this.list.length)
                this.list = [defaultValue];
        },
        distinct: function (distinctCallback) {
            var me = this;
            distinctCallback = createCallback(distinctCallback);
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
        },
        except: function (list, distinctCallback) {
            var me = this;
            distinctCallback = createCallback(distinctCallback);
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
        },
        groupBy: function (groupCallback) {
            var lookup = toLookup(this.list, groupCallback);
            var result = [];
            for (var prop in lookup)
                result.push({ key: prop, value: lookup[prop] });
            this.list = result;
        },
        groupJoin: function (list, sourceCallback, joinCallback, selectCallback) {
            var me = this;
            sourceCallback = createCallback(sourceCallback);
            joinCallback = createCallback(joinCallback);
            if (!sourceCallback || !joinCallback) return;
            var result = [];
            var lookup = {};
            var i = 0;
            var l = list.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = list[i];
                key = joinCallback(obj);
                if (key)
                    if (lookup[key])
                        lookup[key].push(obj);
                    else
                        lookup[key] = [obj];
            }
            i = 0;
            l = me.list.length;
            for (; i < l; i++) {
                obj = me.list[i];
                key = sourceCallback(obj);
                if (key) {
                    var joinObj = lookup[key];
                    if (joinObj)
                        result.push(selectCallback ? selectCallback.call(me.list, obj, lookup[key], i) : joinObj);
                }
            }
            me.list = result;
        },
        intersect: function (list, distinctCallback) {
            var me = this;
            distinctCallback = createCallback(distinctCallback);
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
        },
        join: function (list, sourceCallback, joinCallback, selectCallback) {
            var me = this;
            sourceCallback = createCallback(sourceCallback);
            joinCallback = createCallback(joinCallback);
            if (!sourceCallback || !joinCallback) return;
            var result = [];
            var lookup = {};
            var i = 0;
            var l = list.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = list[i];
                key = joinCallback(obj);
                if (key) lookup[key] = obj;
            }
            i = 0;
            l = me.list.length;
            for (; i < l; i++) {
                obj = me.list[i];
                key = sourceCallback(obj);
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
        },
        orderBy: function (a) {
            this.list.sort(a ? makeOrderBy(arguments) : a);
        },
        orderByDescending: function (a) {
            this.list.sort(a ? makeOrderBy(arguments, true) : function (a, b) { return a > b ? -1 : (b > a ? 1 : 0); });
        },
        reverse: function () {
            var me = this;
            var result = [];
            for (var i = me.list.length; i--;)
                result.push(me.list[i]);
            me.list = result;
        },
        select: function (selectCallback) {
            var me = this;
            selectCallback = createCallback(selectCallback);
            if (!selectCallback) return;
            var result = [];
            for (var i = 0, l = me.list.length; i < l; i++) {
                var obj = me.list[i];
                var newObj = selectCallback.call(me.list, obj, i);
                result.push(newObj);
            }
            me.list = result;
        },
        selectMany: function (selectCallback) {
            var me = this;
            selectCallback = createCallback(selectCallback);
            if (!selectCallback) return;
            var result = [];
            for (var i = 0, l = me.list.length; i < l; i++) {
                var obj = me.list[i];
                var newObj = selectCallback.call(me.list, obj, i);
                result.concat(newObj);
            }
            me.list = result;
        },
        shuffle: function () {
            // Used for testing and card games
            for (var i = this.list.length, j, t; i--;) {
                j = Math.floor(Math.random() * (i + 1));
                t = this.list[i];
                this.list[i] = this.list[j];
                this.list[j] = t;
            }
        },
        skip: function (num) {
            this.list = this.list.slice(num);
        },
        skipWhile: function (whileCallback) {
            var num = makeWhile(this.list, whileCallback);
            this.list = this.list.slice(num);
        },
        take: function (num) {
            this.list = this.list.slice(0, num);
        },
        takeWhile: function (whileCallback) {
            var num = makeWhile(this.list, whileCallback);
            this.list = this.list.slice(0, num);
        },
        union: function (list, distinctCallback) {
            var me = this;
            distinctCallback = createCallback(distinctCallback);
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
        },
        where: function (whereCallback) {
            var me = this;
            whereCallback = createCallback(whereCallback);
            if (!whereCallback) return;
            var result = [];
            for (var i = 0, l = me.list.length; i < l; i++) {
                var obj = me.list[i];
                if (whereCallback.call(me.list, obj, i))
                    result.push(obj);
            }
            me.list = result;
        },
        zip: function (list, selectCallback) {
            var me = this;
            selectCallback = createCallback(selectCallback);
            if (!selectCallback) return;
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
        }
    };
    // Assign every deferred method to the prototype and freeze the function and arguments for later use
    for (var prop in deferredMethods) {
        Enumerable.prototype[prop] = (function (fn) {
            return function () {
                return new Enumerable(this, [fn, arguments]);
            }
        }(deferredMethods[prop]));
    }
    // Pass an array into jinq for easy enumeration
    var jinq = function (list) {
        var enumerable = new Enumerable();
        enumerable.list = list;
        return enumerable;
    };
    // Static Methods
    jinq.empty = function () { return new Enumerable(); };
    jinq.range = function (i, count) {
        var list = [];
        for (var l = i + count; i < l; i++)
            list.push(i);
        return jinq(list);
    };
    jinq.repeat = function (val, count) {
        var list = [];
        for (var i = 0; i < count; i++)
            list.push(val);
        return jinq(list);
    };
    return jinq;
}));
