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
        __resolveQueue: function () {
            this.list = this.list.slice();
            for (var i = 0, l = this.queue.length; i < l; i++) {
                var c = this.queue[i];
                c[0].apply(this, c[1]);
            }
        },
        __toLookup: function (fnKey) {
            var lookup = {};
            for (var i = 0, l = this.list.length; i < l; i++) {
                var value = this.list[i];
                var key = fnKey ? fnKey.call(this.list, value, i) : value;
                if (lookup[key])
                    lookup[key].push(value);
                else
                    lookup[key] = [value];
            }
            return lookup;
        },
        __while: function (whileCallback) {
            for (var i = 0, l = this.list.length; i < l; i++)
                if (!whileCallback.call(this.list, this.list[i], i))
                    break;
            return i;
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
        average: function () {
            return this.sum() / this.list.length;
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
        max: function () {
            this.__resolveQueue();
            return Math.max.apply(null, this.list);
        },
        min: function () {
            this.__resolveQueue();
            return Math.min.apply(null, this.list);
        },
        single: function (whereCallback) {
            var result = this.first(whereCallback);
            return this.list.length === 1 ? result : null;
        },
        sum: function () {
            this.__resolveQueue();
            var result = 0;
            for (var i = this.list; i--;)
                result += this.list[i];
            return result;
        },
        toArray: function (whereCallback) {
            if (whereCallback)
                this.queue.push([deferredMethods.where, arguments]);
            this.__resolveQueue();
            return this.list;
        },
        toDictionary: function (fnKey, fnValue) {
            this.__resolveQueue();
            var result = {};
            for (var i = 0, l = this.list.length; i < l; i++) {
                var value = this.list[i];
                var key = fnKey ? fnKey(value) : value;
                result[key] = fnValue ? fnValue(value) : value;
            }
            return result;
        },
        toLookup: function (fnKey) {
            this.__resolveQueue();
            return this.__toLookup(fnKey);
        }
    };
    // These methods will be postponed till the queue needs to be resolved
    var deferredMethods = {
        concat: function (list) {
            var me = this;
            me.list = me.list.concat.apply(me.list, list);
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
        },
        groupBy: function (groupCallback) {
            var lookup = this.__toLookup(groupCallback);
            var result = [];
            for (var prop in lookup)
                result.push({ key: prop, value: lookup[prop] });
            this.list = result;
        },
        groupJoin: function (list, sourceProp, joinProp, selectCallback) {
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
                key = obj[sourceProp];
                if (key) {
                    var joinObj = lookup[key];
                    if (joinObj) {
                        if (selectCallback)
                            obj = selectCallback.call(me.list, obj, lookup[key], i);
                        else
                            obj = joinObj;
                        result.push(obj);
                    }
                }
            }
            me.list = result;
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
        },
        orderBy: function (a) {
            this.list.sort(a ? this.__makeOrderBy(arguments) : a);
        },
        orderByDescending: function (a) {
            this.list.sort(a ? this.__makeOrderBy(arguments, true) : function (a, b) { return a > b ? -1 : (b > a ? 1 : 0); });
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
            var num = this.__while(whileCallback);
            this.list = this.list.slice(num);
        },
        take: function (num) {
            this.list = this.list.slice(0, num);
        },
        takeWhile: function (whileCallback) {
            var num = this.__while(whileCallback);
            this.list = this.list.slice(0, num);
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
