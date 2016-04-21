var output = document.getElementById('output');
function log(name, arr) {
    var formatted = JSON.stringify(arr, null, 4);
    output.innerHTML += name + ':\n' + formatted + '\n\n';
}

var numberArray = [1, 2, 2, 3, 4, 4, 5, 6];
var anotherNumberArray = [2, 3, 5, 6, 7, 8, 8];
var objectArray = [
    { id: 1, difficulty: 8, gameName: 'Castle Crashers' },
    { id: 2, difficulty: 10, gameName: 'Dustforce' },
    { id: 3, difficulty: 8, gameName: 'Enter the Gungeon' },
    { id: 4, difficulty: 10, gameName: 'Super Meat Boy' },
    { id: 5, difficulty: 6, gameName: 'Super Time Force Ultra' },
    { id: 6, difficulty: 10, gameName: 'VVVVVV' },
];
var anotherObjectArray = [
    { id: 1, objId: 1, type: 'Bronze', trophyName: 'Melee Is Best' },
    { id: 2, objId: 6, type: 'Silver', trophyName: 'Graviton Master' },
    { id: 3, objId: 2, type: 'Gold', trophyName: 'Master of the Custodial Arts' },
    { id: 4, objId: 4, type: 'Platinum', trophyName: 'Super Meat Boy!' }
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
log('concat numbers', jinq(numberArray).toArray());
log('concat objects', jinq(objectArray).toArray());
/* /
log('contains numbers', jinq(numberArray).toArray());
log('contains objects', jinq(objectArray).toArray());
/* /
log('count numbers', jinq(numberArray).toArray());
log('count objects', jinq(objectArray).toArray());
/* /
log('distinct numbers', jinq(numberArray).toArray());
log('distinct objects', jinq(objectArray).toArray());
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
log('groupBy numbers', jinq(numberArray).toArray());
log('groupBy objects', jinq(objectArray).toArray());
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
log('orderBy objects id property', shuffledObjects.orderBy('difficulty', 'id').toArray());
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
log('skip numbers', jinq(numberArray).toArray());
log('skip objects', jinq(objectArray).toArray());
/* /
log('take numbers', jinq(numberArray).toArray());
log('take objects', jinq(objectArray).toArray());
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
/* */
