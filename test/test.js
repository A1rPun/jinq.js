var output = document.getElementById('output');
function log(name, arr) {
    var formatted = JSON.stringify(arr, null, 4);
    output.innerHTML += name + ':\n' + formatted + '\n\n';
}

var numberArray = [1, 2, 2, 3, 4, 4, 5, 6];
var anotherNumberArray = [2, 3, 5, 6, 7, 8, 8];
var objectArray = [
    { id: 1, difficulty: 3, trophyDifficulty: 8, gameName: 'Castle Crashers' },
    { id: 2, difficulty: 9, trophyDifficulty: 10, gameName: 'Dustforce' },
    { id: 3, difficulty: 8, trophyDifficulty: 8, gameName: 'Enter the Gungeon' },
    { id: 4, difficulty: 8, trophyDifficulty: 10, gameName: 'Super Meat Boy' },
    { id: 5, difficulty: 6, trophyDifficulty: 7, gameName: 'Super Time Force Ultra' },
    { id: 6, difficulty: 6, trophyDifficulty: 10, gameName: 'VVVVVV' },
];
var anotherObjectArray = [
    { id: 1, objId: 1, type: 'Bronze', trophyName: 'Melee Is Best' },
    { id: 2, objId: 6, type: 'Silver', trophyName: 'Graviton Master' },
    { id: 3, objId: 2, type: 'Gold', trophyName: 'Master of the Custodial Arts' },
    { id: 4, objId: 4, type: 'Platinum', trophyName: 'Super Meat Boy!' },
    { id: 5, objId: 6, type: 'Silver', trophyName: 'Master of the Universe' },
];

/* */
log('numbers', numberArray);
log('objects', objectArray);
/* /
log('aggregate numbers', jinq(numberArray).toArray());
log('aggregate objects', jinq(objectArray).toArray());
/* /
log('all numbers', jinq(numberArray).toArray());
log('all objects', jinq(objectArray).toArray());
/* /
log('any numbers', jinq(numberArray).toArray());
log('any objects', jinq(objectArray).toArray());
/* /
log('concat numbers', jinq(numberArray).concat(anotherNumberArray).toArray());
log('concat objects', jinq(objectArray).concat(anotherObjectArray).toArray());
/* /
log('contains numbers', jinq(numberArray).toArray());
log('contains objects', jinq(objectArray).toArray());
/* /
log('count numbers', jinq(numberArray).toArray());
log('count objects', jinq(objectArray).toArray());
/* /
log('distinct numbers', jinq(numberArray).distinct().toArray());
//log('distinct objects', jinq(objectArray).distinct().toArray());// Not Implemented
log('distinct trophyDifficulty objects', jinq(objectArray).distinct(function (o) { o.trophyDifficulty }).toArray());
/* /
log('elementAt numbers', jinq(numberArray).toArray());
log('elementAt objects', jinq(objectArray).toArray());
/* /
log('except numbers', jinq(numberArray).toArray());
log('except objects', jinq(objectArray).toArray());
/* /
log('first numbers', jinq(numberArray).toArray());
log('first objects', jinq(objectArray).toArray());
/* /
log('groupBy numbers', jinq(numberArray).groupBy(function (o) { return o < 4; }).toArray());
log('groupBy objects', jinq(objectArray).groupBy(function (o) { return o.trophyDifficulty; }).toArray());
/* /
log('groupJoin objects with select', jinq(objectArray).groupJoin(anotherObjectArray, 'id', 'objId', function (a, b) {
    return { gameName: a.gameName, trophies: b };
}).toArray());
log('groupJoin objects', jinq(anotherObjectArray).groupJoin(objectArray, 'objId', 'id').toArray());
/* /
log('intersect numbers', jinq(numberArray).toArray());
log('intersect objects', jinq(objectArray).toArray());
/* /
log('join objects', jinq(objectArray).join(anotherObjectArray, 'id', 'objId').toArray());
log('join objects with select', jinq(anotherObjectArray).join(objectArray, 'objId', 'id', function (a, b) {
    return a.id + '. ' + b.gameName + ' : ' + a.trophyName;
}).toArray());
/* /
log('last numbers', jinq(numberArray).toArray());
log('last objects', jinq(objectArray).toArray());
/* /
var shuffledNumbers = jinq(numberArray).shuffle();
var shuffledObjects = jinq(objectArray).shuffle();
log('shuffled numbers', shuffledNumbers.toArray());
log('shuffled objects', shuffledObjects.toArray());

log('orderBy numbers', shuffledNumbers.orderBy().toArray());
log('orderBy objects trophyDifficulty property', shuffledObjects.orderBy('trophyDifficulty').toArray());
log('orderByDescending objects trophyDifficulty & difficulty properties', shuffledObjects.orderByDescending('trophyDifficulty', 'difficulty').toArray());
log('orderBy objects ascending difficulty & descending id properties', shuffledObjects.orderBy('difficulty', function (a, b) { return b.id - a.id }).toArray());
/* /
log('reverse numbers', jinq(numberArray).reverse().toArray());
log('reverse objects', jinq(objectArray).reverse().toArray());
/* /
log('select numbers multiplied by 2', jinq(numberArray).select(function (o) {
    return o * 2;
}).toArray());
log('select numbers into object', jinq(numberArray).select(function (o) {
    return { num: o, multiplied: o * o };
}).toArray());
log('select objects into names', jinq(objectArray).select(function (o) {
    return o.name;
}).toArray());
/* /
log('selectMany numbers', jinq(numberArray).toArray());
log('selectMany objects', jinq(objectArray).toArray());
/* /
log('single numbers 3', jinq(numberArray).single(function (o) { return o === 3 }));
log('single numbers 4', jinq(numberArray).single(function (o) { return o === 4 }));
log('single objects', jinq(objectArray).single());
log('single objects', jinq(objectArray).single(function (o) { return o.id === 1 }));
/* /
log('skip 4 numbers', jinq(numberArray).skip(4).toArray());
log('skip 4 objects', jinq(objectArray).skip(4).toArray());
/* /
log('skipWhile numbers', jinq(numberArray).skipWhile(function (o) { return o < 3 }).toArray());
log('skipWhile objects', jinq(objectArray).skipWhile(function (o) { return o.id < 3 }).toArray());
/* /
log('take 3 numbers', jinq(numberArray).take(3).toArray());
log('take 3 objects', jinq(objectArray).take(3).toArray());
/* /
log('takeWhile numbers', jinq(numberArray).takeWhile(function (o) { return o < 3 }).toArray());
log('takeWhile objects', jinq(objectArray).takeWhile(function (o) { return o.id < 3 }).toArray());
/* /
log('toDictionary numbers', jinq(numberArray).toDictionary());
log('toDictionary objects', jinq(objectArray).toDictionary(function (o) { return o.id }));
/* /
log('toLookup numbers', jinq(numberArray).toLookup());
log('toLookup objects', jinq(objectArray).toLookup(function (o) { return o.trophyDifficulty }));
/* /
log('union numbers', jinq(numberArray).toArray());
log('union objects', jinq(objectArray).toArray());
/* /
log('where numbers', jinq(numberArray).where(function (o) {
    return o > 2;
}).toArray());
log('where objects', jinq(objectArray).where(function (o) {
    return o.id < 5;
}).toArray());
/* /
log('zip numbers', jinq(numberArray).zip(anotherNumberArray, function (a, b) {
    return a + b;
}).toArray());
log('zip objects', jinq(objectArray).zip(anotherObjectArray, function (a, b) {
    return a.id + b.id;
}).toArray());
/* /
// Testing deferred execution
var source = [5, 6, 3, 1, 2, 9, 0, 4, 7, 8];
var where = jinq(source)
.where(function (obj) {
    return obj > 1;
});
var select = where.select(function (obj) {
    return {
        original: obj,
        multiplied: obj * 2,
        isEven: obj % 2 === 0
    };
});
var groupBy = select.groupBy(function (obj) {
    return obj.isEven;
});
log('`where, select & groupBy` deferred', groupBy.list);
log('groupBy', groupBy.toArray());
log('select', select.toArray());
log('where', where.toArray());
log('sauce', source);
/* /
log('empty', jinq.empty().toArray());
log('range', jinq.range(0, 10).toArray());
log('range negative', jinq.range(-9, 10).toArray());
log('repeat', jinq.repeat(1337, 5).toArray());
// Repeat instance test
var foo = { bar: 'test' };
var repeat = jinq.repeat(foo, 3);
log('repeat object', repeat.toArray());
foo.bar = 'wooop';
log('repeat object', repeat.toArray());
/* */
