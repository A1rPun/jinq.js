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
        any: function () {
            return !!this.first()
        },
        count: function () {
            return this.toArray().length;
        },
        groupBy: function (fn) {
            var result = [];
            var prop = 'key';
            for (var i = 0, l = this._data.length; i < l; i++) {
                var obj = this._data[i];
                var group = fn.call(this._data, obj, i);
                var index = getIndexOf(result, prop, group);

                if (index === -1)
                    result.push({
                        key: group,
                        value: [obj]
                    });
                else
                    result[index].value.push(obj);
            }
            this._data = result;
            return this;
        },
        first: function () {
            var result = this.toArray();
            var length = result.length;
            return length ? result[0] : null;
        },
        last: function () {
            var result = this.toArray();
            var length = result.length;
            return length ? result[result.length - 1] : null;
        },
        orderBy: function () {
            var newArr = this._data.slice();
            this._data = newArr.sort.apply(newArr, arguments);
            return this;
        },
        select: function (fn) {
            this._data = this._data.map.apply(this._data, arguments);
            return this;
        },
        //thenBy: function () { },
        toArray: function () {
            return this._data;
        },
        where: function (fn) {
            var result = [];
            for (var i = 0, l = this._data.length; i < l; i++) {
                var obj = this._data[i];
                if (fn.call(this._data, obj, i))
                    result.push(obj);
            }
            this._data = result;
            return this;
        }
    };

    function getIndexOf(arr, prop, val) {
        for (var i = 0, l = arr.length; i < l; i++)
            if (arr[i][prop] === val)
                return i;
        return -1;
    }

    return function jinq(arr) {
        return new enumerable(arr);
    };
}));
