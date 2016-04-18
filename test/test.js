var output = document.getElementById('output');
function log(name, arr) {
    var formatted = JSON.stringify(arr, null, 4);
    output.innerHTML += name + ':\n' + formatted + '\n\n';
}

var numberArray = [5, 6, 3, 1, 2, 9, 0, 4, 7, 8];
var objectArray = [
    { original: 5, multiplied: 10, isEven: false },
    { original: 3, multiplied: 6, isEven: false },
    { original: 6, multiplied: 12, isEven: true },
    { original: 2, multiplied: 4, isEven: true },
    { original: 4, multiplied: 8, isEven: true },
    { original: 8, multiplied: 16, isEven: true }
];
var anotherObjectArray = [
    { original: 1, multiplied: 2, isEven: false },
    { original: 7, multiplied: 14, isEven: false },
    { original: 0, multiplied: 0, isEven: true },
    { original: 9, multiplied: 18, isEven: false }
];

/* /
log('aggregate numbers', jinq(numberArray).toArray());
/* /
log('aggregate objects', jinq(objectArray).toArray());
/* /
log('all numbers', jinq(numberArray).toArray());
/* /
log('all objects', jinq(objectArray).toArray());
/* /
log('any numbers', jinq(numberArray).toArray());
/* /
log('any objects', jinq(objectArray).toArray());
/* /
log('concat numbers', jinq(numberArray).toArray());
/* /
log('concat objects', jinq(objectArray).toArray());
/* /
log('contains numbers', jinq(numberArray).toArray());
/* /
log('contains objects', jinq(objectArray).toArray());
/* /
log('count numbers', jinq(numberArray).toArray());
/* /
log('count objects', jinq(objectArray).toArray());
/* /
log('distinct numbers', jinq(numberArray).toArray());
/* /
log('distinct objects', jinq(objectArray).toArray());
/* /
log('elementAt numbers', jinq(numberArray).toArray());
/* /
log('elementAt objects', jinq(objectArray).toArray());
/* /
log('except numbers', jinq(numberArray).toArray());
/* /
log('except objects', jinq(objectArray).toArray());
/* /
log('first numbers', jinq(numberArray).toArray());
/* /
log('first objects', jinq(objectArray).toArray());
/* /
log('groupBy numbers', jinq(numberArray).toArray());
/* /
log('groupBy objects', jinq(objectArray).toArray());
/* /
log('intersect numbers', jinq(numberArray).toArray());
/* /
log('intersect objects', jinq(objectArray).toArray());
/* /
log('last numbers', jinq(numberArray).toArray());
/* /
log('last objects', jinq(objectArray).toArray());
/* /
log('orderBy numbers', jinq(numberArray).toArray());
/* /
log('orderBy objects', jinq(objectArray).toArray());
/* /
log('reverse numbers', jinq(numberArray).toArray());
/* /
log('reverse objects', jinq(objectArray).toArray());
/* /
log('select numbers', jinq(numberArray).toArray());
/* /
log('select objects', jinq(objectArray).toArray());
/* /
log('selectMany numbers', jinq(numberArray).toArray());
/* /
log('selectMany objects', jinq(objectArray).toArray());
/* /
log('skip numbers', jinq(numberArray).toArray());
/* /
log('skip objects', jinq(objectArray).toArray());
/* /
log('take numbers', jinq(numberArray).toArray());
/* /
log('take objects', jinq(objectArray).toArray());
/* /
log('union numbers', jinq(numberArray).toArray());
/* /
log('union objects', jinq(objectArray).toArray());
/* */
log('where numbers', jinq(numberArray).where(function (o) { return o > 5 }).toArray());
/* */
log('where objects', jinq(objectArray).where(function (o) { return o.original < 6 }).toArray());
/* /
log('zip numbers', jinq(numberArray).toArray());
/* /
log('zip objects', jinq(objectArray).toArray());
/* */
