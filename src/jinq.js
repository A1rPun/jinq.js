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
        this.list = list || [];
        this.queue = [];
    }
    // Prototype methods which have no enumerable return types
    Enumerable.prototype = {
        aggregate: function (aggregateCallback, seed) {
            var result = seed;
            if (aggregateCallback) {
                var list = resolveQueue(this);
                var i = 0;
                var l = list.length;
                if (!seed && l) {
                    result = list[0];
                    i = 1;
                }
                for (; i < l; i++) {
                    var obj = list[i];
                    result = aggregateCallback.call(list, result, obj, i);
                }
            }
            return result;
        },
        all: function (whereCallback) {
            if (whereCallback = createCallback(whereCallback)) {
                var list = resolveQueue(this);
                var l = list.length;
                for (var i = 0; i < l; i++)
                    if (!whereCallback.call(list, list[i], i))
                        return false;
                return l > 0;
            }
        },
        any: function (whereCallback) {
            return !!this.first(whereCallback);
        },
        average: function () {
            var list = resolveQueue(this);
            var l = list.length;
            var result = 0;
            for (var i = l; i--;)
                result += list[i];
            return l ? result / l : result;
        },
        contains: function (val) {
            var list = resolveQueue(this);
            return list.indexOf(val) !== -1;
        },
        count: function (whereCallback) {
            return this.toArray(whereCallback).length;
        },
        elementAt: function (index) {
            var list = resolveQueue(this);
            if (index > 0 && index < list.length)
                return list[index];
        },
        first: function (whereCallback) {
            var list = this.toArray(whereCallback);
            if (list.length)
                return list[0];
        },
        last: function (whereCallback) {
            var list = this.toArray(whereCallback);
            var l = list.length;
            if (l)
                return list[l - 1];
        },
        max: function () {
            return Math.max.apply(-Infinity, resolveQueue(this));
        },
        min: function () {
            return Math.min.apply(Infinity, resolveQueue(this));
        },
        sequenceEqual: function (sequence) {
            if (sequence) {
                var list = resolveQueue(this);
                var l = list.length;
                if (l === sequence.length) {
                    for (var i = 0; i < l; i++)
                        if (list[i] !== sequence[i])
                            return false;
                    return true;
                }
            }
            return false;
        },
        single: function (whereCallback) {
            var list = this.toArray(whereCallback);
            if (list.length === 1)
                return list[0];
        },
        sum: function () {
            var list = resolveQueue(this);
            var result = 0;
            for (var i = list.length; i--;)
                result += list[i];
            return result;
        },
        toArray: function (whereCallback) {
            if (whereCallback)
                this.queue.push([deferredMethods.where, arguments]);
            return resolveQueue(this);
        },
        toDictionary: function (keyCallback, valueCallback) {
            var list = resolveQueue(this);
            keyCallback = createCallback(keyCallback);
            valueCallback = createCallback(valueCallback);
            var result = {};
            for (var i = 0, l = list.length; i < l; i++) {
                var value = list[i];
                var key = keyCallback ? keyCallback(value) : value;
                result[key] = valueCallback ? valueCallback(value) : value;
            }
            return result;
        },
        toLookup: function (keyCallback) {
            return toLookup(resolveQueue(this), keyCallback);
        }
    };
    Enumerable.prototype.longCount = Enumerable.prototype.count;
    Enumerable.prototype.toList = Enumerable.prototype.toArray;
    function createCallback(cb) {
        return ofType(cb) === 'string' ? function (o) { return o[cb] } : cb;
    }
    function ofType(obj) {
        return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    function makeOrderBy(args, desc) {
        function makeCompare(prop) {
            return desc
                ? function (a, b) { return a[prop] > b[prop] ? -1 : (b[prop] > a[prop] ? 1 : 0); }
                : function (a, b) { return a[prop] > b[prop] ? 1 : (b[prop] > a[prop] ? -1 : 0); };
        }
        for (var i = args.length; i--;) {
            var arg = args[i];
            if (ofType(arg) !== 'function')
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
        var list = enumerable.list.slice();
        for (var i = 0, l = enumerable.queue.length; i < l; i++) {
            var c = enumerable.queue[i];
            list = c[0].apply(list, c[1]);
        }
        return list;
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
            return this.concat(list);
        },
        defaultIfEmpty: function (defaultValue) {
            return this.length ? this : [defaultValue];
        },
        distinct: function (distinctCallback) {
            distinctCallback = createCallback(distinctCallback);
            var result = [];
            var lookup = {};
            for (var i = 0, l = this.length; i < l; i++) {
                var obj = this[i];
                var key = distinctCallback ? distinctCallback.call(this, obj, i) : obj;
                if (lookup[key]) continue;
                lookup[key] = true;
                result.push(obj);
            }
            return result;
        },
        except: function (list, distinctCallback) {
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
            l = this.length;
            for (; i < l; i++) {
                obj = this[i];
                key = distinctCallback ? distinctCallback.call(this, obj, i) : obj;
                if (!lookup[key])
                    result.push(obj);
            }
            return result;
        },
        groupBy: function (groupCallback) {
            var lookup = toLookup(this, groupCallback);
            var result = [];
            for (var prop in lookup)
                result.push({ key: prop, value: lookup[prop] });
            return result;
        },
        groupJoin: function (list, sourceCallback, joinCallback, selectCallback) {
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
            l = this.length;
            for (; i < l; i++) {
                obj = this[i];
                key = sourceCallback(obj);
                if (key) {
                    var joinObj = lookup[key];
                    if (joinObj)
                        result.push(selectCallback ? selectCallback.call(this, obj, lookup[key], i) : joinObj);
                }
            }
            return result;
        },
        intersect: function (list, distinctCallback) {
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
            l = this.length;
            for (; i < l; i++) {
                obj = this[i];
                key = distinctCallback ? distinctCallback.call(this, obj, i) : obj;
                if (lookup[key])
                    result.push(obj);
            }
            return result;
        },
        join: function (list, sourceCallback, joinCallback, selectCallback) {
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
            l = this.length;
            for (; i < l; i++) {
                obj = this[i];
                key = sourceCallback(obj);
                if (key) {
                    var joinObj = lookup[key];
                    if (joinObj) {
                        if (selectCallback)
                            obj = selectCallback.call(this, obj, lookup[key], i);
                        else
                            for (var prop in joinObj)
                                if (!obj[prop])
                                    obj[prop] = joinObj[prop];
                        result.push(obj);
                    }
                }
            }
            return result;
        },
        ofType: function (type) {
            type = type || 'undefined';
            var result = [];
            for (var i = 0, l = this.length; i < l; i++) {
                var el = this[i];
                if (ofType(el) === type)
                    result.push(el);
            }
            return result;
        },
        orderBy: function (a) {
            this.sort(a ? makeOrderBy(arguments) : a);
            return this;
        },
        orderByDescending: function (a) {
            this.sort(a ? makeOrderBy(arguments, true) : function (a, b) { return a > b ? -1 : (b > a ? 1 : 0); });
            return this;
        },
        reverse: function () {
            var result = [];
            for (var i = this.length; i--;)
                result.push(this[i]);
            return result;
        },
        select: function (selectCallback) {
            selectCallback = createCallback(selectCallback);
            if (!selectCallback) return;
            var result = [];
            for (var i = 0, l = this.length; i < l; i++) {
                var obj = this[i];
                var newObj = selectCallback.call(this, obj, i);
                result.push(newObj);
            }
            return result;
        },
        selectMany: function (selectCallback) {
            selectCallback = createCallback(selectCallback);
            if (!selectCallback) return;
            var result = [];
            for (var i = 0, l = this.length; i < l; i++) {
                var obj = this[i];
                var newObj = selectCallback.call(this, obj, i);
                result.concat(newObj);
            }
            return result;
        },
        shuffle: function () {
            // Used for testing and card games
            for (var i = this.length, j, t; i--;) {
                j = Math.floor(Math.random() * (i + 1));
                t = this[i];
                this[i] = this[j];
                this[j] = t;
            }
            return this;
        },
        skip: function (num) {
            return this.slice(num);
        },
        skipWhile: function (whileCallback) {
            var num = makeWhile(this, whileCallback);
            return this.slice(num);
        },
        take: function (num) {
            return this.slice(0, num);
        },
        takeWhile: function (whileCallback) {
            var num = makeWhile(this, whileCallback);
            return this.slice(0, num);
        },
        union: function (list, distinctCallback) {
            distinctCallback = createCallback(distinctCallback);
            var result = [];
            var lookup = {};
            var i = 0;
            var l = this.length;
            var obj;
            var key;
            for (; i < l; i++) {
                obj = this[i];
                key = distinctCallback ? distinctCallback.call(this, obj, i) : obj;
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
            return result;
        },
        where: function (whereCallback) {
            whereCallback = createCallback(whereCallback);
            if (!whereCallback) return;
            var result = [];
            for (var i = 0, l = this.length; i < l; i++) {
                var obj = this[i];
                if (whereCallback.call(this, obj, i))
                    result.push(obj);
            }
            return result;
        },
        zip: function (list, selectCallback) {
            selectCallback = createCallback(selectCallback);
            if (!selectCallback) return;
            var result = [];
            var sourceLength = this.length;
            var destLength = list.length;
            var l = sourceLength < destLength ? sourceLength : destLength;
            for (var i = 0; i < l; i++) {
                var sourceObj = this[i];
                var destObj = list[i];
                var newObj = selectCallback.call(this, sourceObj, destObj, i);
                result.push(newObj);
            }
            return result;
        }
    };
    // Assign every deferred method to the prototype and freeze the function and arguments for later use
    for (var prop in deferredMethods) {
        Enumerable.prototype[prop] = (function (fn) {
            return function () {
                var e = new Enumerable(this.list);
                e.queue = e.queue.concat(this.queue);
                e.queue.push([fn, arguments]);
                return e;
            }
        }(deferredMethods[prop]));
    }
    // Pass an array into jinq for easy enumeration
    var jinq = function (list) {
        return new Enumerable(arguments.length === 1 && ofType(list) === 'array' ? list : Array.prototype.slice.call(arguments));
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
