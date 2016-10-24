(function (name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else {
        var noConflict = this[name];
        this[name] = definition();
        if (noConflict) this[name].noConflict = noConflict;
    }
}('jinq', function () {
    var UNDEFINED = 'undefined';
    var DEFAULT = null;
    function Enumerable(list) {
        this.list = list || [];
        this.queue = [];
    }
    // Prototype methods which have no enumerable return types
    Enumerable.prototype = {
        aggregate: function (aggregateCallback, seed, selectCallback) {
            //TODO selectCallback
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
                    result = aggregateCallback(result, obj, i);
                }
            }
            return result;
        },
        all: function (whereCallback) {
            if (whereCallback = createCallback(whereCallback)) {
                var list = resolveQueue(this);
                var l = list.length;
                for (var i = 0; i < l; i++)
                    if (!whereCallback(list[i], i))
                        return false;
                return l > 0;
            }
        },
        any: function (whereCallback) {
            return !!this.first(whereCallback);
        },
        average: function (selectCallback) {
            //TODO selectCallback
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
        //elementAtOrDefault - index,default
        elementAt: function (index) {
            var list = resolveQueue(this);
            if (index > 0 && index < list.length)
                return list[index];
        },
        //firstOrDefault - whereCallback,default
        first: function (whereCallback) {
            var list = this.toArray(whereCallback);
            if (list.length)
                return list[0];
        },
        //lastOrDefault - whereCallback,default
        last: function (whereCallback) {
            var list = this.toArray(whereCallback);
            var l = list.length;
            if (l)
                return list[l - 1];
        },
        max: function () {
            var list = resolveQueue(this);
            var result = -Infinity;
            for (var i = list.length; i--;) {
                var val = list[i];
                if (result < val)
                    result = val;
            }
            return result;
        },
        min: function () {
            var list = resolveQueue(this);
            var result = Infinity;
            for (var i = list.length; i--;) {
                var val = list[i];
                if (result > val)
                    result = val;
            }
            return result;
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
        //singleOrDefault - whereCallback,default
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
        toDictionary: function (keyCallback, selectCallback) {
            return toLookup(false, resolveQueue(this), keyCallback, selectCallback);
        },
        toLookup: function (keyCallback, selectCallback) {
            return toLookup(true, resolveQueue(this), keyCallback, selectCallback);
        }
    };
    Enumerable.prototype.longCount = Enumerable.prototype.count;
    Enumerable.prototype.toList = Enumerable.prototype.toArray;
    function createCallback(cb) {
        return ofType(cb) === 'string' ? function (o) { return o[cb] } : cb;
    }
    function ofType(obj, extend) {
        return extend ? Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase() : typeof obj;
    }
    function getHashCode(obj) {
        var hashCode = '';
        if (ofType(obj) !== 'object')
            return hashCode + obj;
        for (var prop in obj)
            hashCode += prop + obj[prop];
        return hashCode;
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
    function toLookup(multiple, list, keyCallback, selectCallback) {
        var lookup = {};
        keyCallback = createCallback(keyCallback);
        selectCallback = createCallback(selectCallback);
        for (var i = 0, l = list.length; i < l; i++) {
            var value = list[i];
            var key = keyCallback ? keyCallback(value, list) : getHashCode(value);
            value = selectCallback ? selectCallback(value) : value;
            if (lookup[key]) {
                if (multiple)
                    lookup[key].push(value);
            } else
                lookup[key] = multiple ? [value] : value;
        }
        return lookup;
    }
    function makeWhile(list, whileCallback) {
        whileCallback = createCallback(whileCallback);
        for (var i = 0, l = list.length; i < l; i++)
            if (!whileCallback(list[i], i))
                break;
        return i;
    }
    // These methods will be postponed till the queue needs to be resolved
    var deferredMethods = {
        concat: function (list) {
            return list ? this.concat(list) : this;
        },
        defaultIfEmpty: function (defaultValue) {
            return this.length ? this : [defaultValue];
        },
        distinct: function (keyCallback) {
            var lookup = toLookup(false, this, keyCallback);
            var result = [];
            for (var prop in lookup)
                result.push(lookup[prop]);
            return result;
        },
        except: function (list, keyCallback) {
            if (!list) return this;
            var lookup = toLookup(false, this, keyCallback);
            var lookup2 = toLookup(false, list, keyCallback);
            var result = [];
            for (var prop in lookup) {
                if (ofType(lookup2[prop]) === UNDEFINED)
                    result.push(lookup[prop]);
            }
            return result;
        },
        groupBy: function (keyCallback, selectCallback) {
            var lookup = toLookup(true, this, keyCallback, selectCallback);
            var result = [];
            for (var prop in lookup)
                result.push({ key: prop, value: lookup[prop] });
            return result;
        },
        groupJoin: function (list, sourceCallback, joinCallback, selectCallback) {
            if (!list || !selectCallback) return this;
            var lookup = toLookup(true, this, sourceCallback);
            var lookup2 = toLookup(true, list, joinCallback);
            var result = [];
            for (var prop in lookup) {
                if (ofType(lookup2[prop]) !== UNDEFINED)
                    result.push(selectCallback ? selectCallback(lookup[prop], lookup2[prop]) : lookup[prop].concat(lookup2[prop]))
            }
            return result;
        },
        intersect: function (list) {
            if (!list) return this;
            var lookup = toLookup(false, this);
            var lookup2 = toLookup(false, list);
            var result = [];
            for (var prop in lookup) {
                if (ofType(lookup2[prop]) !== UNDEFINED)
                    result.push(lookup[prop]);
            }
            return result;
        },
        join: function (list, sourceCallback, joinCallback, selectCallback) {
            if (!list || !selectCallback) return this;
            var lookup = toLookup(false, this, sourceCallback);
            var lookup2 = toLookup(false, list, joinCallback);
            var result = [];
            for (var prop in lookup)
                if (ofType(lookup2[prop]) !== UNDEFINED) {
                    var obj;
                    if (selectCallback)
                        obj = selectCallback(lookup[prop], lookup2[prop])
                    else {
                        obj = {};
                        var p;
                        var l1 = lookup[prop];
                        var l2 = lookup2[prop];
                        for (p in l1)
                            obj[p] = l1[p];
                        for (p in l2)
                            obj[p] = l2[p];
                    }
                    result.push(obj);
                }
            return result;
        },
        ofType: function (type) {
            type = type || UNDEFINED;
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
            if (!selectCallback) return this;
            var result = [];
            for (var i = 0, l = this.length; i < l; i++) {
                var obj = this[i];
                var newObj = selectCallback(obj, i);
                result.push(newObj);
            }
            return result;
        },
        selectMany: function (selectCallback) {
            selectCallback = createCallback(selectCallback);
            if (!selectCallback) return this;
            var result = [];
            for (var i = 0, l = this.length; i < l; i++) {
                var obj = this[i];
                var newObj = selectCallback(obj, i);
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
        union: function (list) {
            if (!list) return this;
            var lookup = toLookup(false, this);
            var lookup2 = toLookup(false, list);
            var result = [];
            for (var prop in lookup) {
                result.push(lookup[prop]);
                //delete lookup2[prop];
            }
            for (var prop in lookup2)
                result.push(lookup2[prop]);
            return result;
        },
        where: function (whereCallback) {
            whereCallback = createCallback(whereCallback);
            if (!whereCallback) return this;
            var result = [];
            for (var i = 0, l = this.length; i < l; i++) {
                var obj = this[i];
                if (whereCallback(obj, i))
                    result.push(obj);
            }
            return result;
        },
        zip: function (list, selectCallback) {
            selectCallback = createCallback(selectCallback);
            if (!list || !selectCallback) return this;
            var result = [];
            var sourceLength = this.length;
            var destLength = list.length;
            var l = sourceLength < destLength ? sourceLength : destLength;
            for (var i = 0; i < l; i++) {
                var sourceObj = this[i];
                var destObj = list[i];
                var newObj = selectCallback(sourceObj, destObj, i);
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
        return new Enumerable(arguments.length === 1 && ofType(list, 1) === 'array' ? list : Array.prototype.slice.call(arguments));
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
