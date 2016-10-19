var output = document.getElementById('output');
function log(name, arr) {
    var formatted = Array.isArray(arr) ? JSON.stringify(arr, null, 4) : arr;
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
/* */
log('objects', objectArray);
/* /
log('aggregate parameterless', jinq(numberArray).aggregate());
log('aggregate empty', jinq.empty().aggregate(function (a, b) { return a + b }, 'seed'));
log('aggregate sum numbers without seed', jinq(numberArray).aggregate(function(a, b){ return a + b }));
log('aggregate sum numbers with seed 10', jinq(numberArray).aggregate(function(a, b){ return a + b }, 10));
log('aggregate sum objects difficulty', jinq(objectArray).select('difficulty').aggregate(function(a, b){ return a + b }, 0));
/* /
log('all numbers parameterless', jinq(numberArray).all());
log('all empty', jinq.empty().all(function (o) { return o === 0; }));
log('all numbers > -1', jinq(numberArray).all(function (o) { return o > -1; }));
log('all numbers > 5', jinq(numberArray).all(function (o) { return o > 5; }));
/* /
log('any numbers parameterless', jinq(numberArray).any());
log('any empty', jinq.empty().any());
log('any numbers > 10', jinq(numberArray).any(function (o) { return o > 10; }));
log('any objects difficulty < 11', jinq(objectArray).any(function (o) { return o.difficulty < 11; }));
/* /
log('average numbers parameterless', jinq(numberArray).average());
log('average empty', jinq.empty().average());
log('average objects difficulty', jinq(objectArray).select('difficulty').average());
/* /
log('concat numbers', jinq(numberArray).concat(anotherNumberArray).toArray());
log('concat objects', jinq(objectArray).concat(anotherObjectArray).toArray());
/* /
log('contains numbers parameterless', jinq(numberArray).contains());
log('contains empty', jinq.empty().contains(0));
log('contains numbers 3', jinq(numberArray).contains(3));
log('contains numbers 1337', jinq(numberArray).contains(1337));
log('contains objects reference', jinq(objectArray).contains(objectArray[0]));
/* /
log('count numbers parameterless', jinq(numberArray).count());
log('count objects parameterless', jinq(objectArray).count());
log('count empty', jinq.empty().count());
log('count objects trophyDifficulty 10', jinq(objectArray).count(function (o) { return o.trophyDifficulty === 10; }));
/* /
log('distinct numbers', jinq(numberArray).distinct().toArray());
//log('distinct objects', jinq(objectArray).distinct().toArray());// Not Implemented
log('distinct trophyDifficulty objects', jinq(objectArray).distinct(function (o) { o.trophyDifficulty }).toArray());
/* /
log('elementAt parameterless', jinq(numberArray).elementAt());
log('elementAt empty', jinq.empty().elementAt(0));
log('elementAt numbers 1', jinq(numberArray).elementAt(1));
log('elementAt objects 1', jinq(objectArray).elementAt(1));
log('elementAt numbers -1', jinq(numberArray).elementAt(-1));
/* /
log('except numbers', jinq(numberArray).toArray());
log('except objects', jinq(objectArray).toArray());
/* /
log('first numbers parameterless', jinq(numberArray).first());
log('first objects parameterless', jinq(objectArray).first());
log('first empty', jinq.empty().first());
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
log('last numbers parameterless', jinq(numberArray).last());
log('last objects parameterless', jinq(objectArray).last());
log('last empty', jinq.empty().last());
/* /
log('min numbers parameterless', jinq(numberArray).min());
log('min empty', jinq.empty().min());
log('min objects difficulty', jinq(objectArray).select('difficulty').min());
/* /
log('max numbers parameterless', jinq(numberArray).max());
log('max empty', jinq.empty().max());
log('max objects difficulty', jinq(objectArray).select('difficulty').max());
/* /
log('selectMany numbers', jinq(numberArray).toArray());
log('selectMany objects', jinq(objectArray).toArray());
/* /
log('single numbers parameterless', jinq(numberArray).single());
log('single empty', jinq.empty().single());
log('single objects', jinq(objectArray).single(function (o) { return o.id === 3; }));
/* /
log('sum numbers parameterless', jinq(numberArray).sum());
log('sum empty', jinq.empty().sum());
log('sum objects difficulty', jinq(objectArray).select('difficulty').sum());
/* /
log('ofType number', jinq(null, 7, 5, 'lol', 'multiple arguments?', 1337).ofType('number').toArray());
log('ofType string', jinq(1, 2, '3', '4', 5, 6).ofType('string').toArray());
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
log('select numbers multiplied by 2', jinq(numberArray).select(function (o) { return o * 2; }).toArray());
log('select numbers into object', jinq(numberArray).select(function (o) {
    return { num: o, multiplied: o * o };
}).toArray());
log('select objects into names', jinq(objectArray).select(function (o) { return o.name; }).toArray());
/* /
log('selectMany numbers', jinq(numberArray).toArray());
log('selectMany objects', jinq(objectArray).toArray());
/* /
log('sequenceEqual parameterless', jinq(numberArray).sequenceEqual());
log('sequenceEqual empty', jinq.empty().sequenceEqual([]));
log('sequenceEqual numbers true', jinq(numberArray).sequenceEqual([1, 2, 2, 3, 4, 4, 5, 6]));
log('sequenceEqual objects reference', jinq(objectArray).sequenceEqual(objectArray.concat()));
log('sequenceEqual numbers nosequence', jinq(numberArray).sequenceEqual([1, 2, 2, 3, 4, 4, 5]));
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
log('toDictionary numbers parameterless', jinq(numberArray).toDictionary());
log('toDictionary empty', jinq.empty().toDictionary());
log('toDictionary objects', jinq(objectArray).toDictionary(function (o) { return o.id }));
log('toDictionary objects', jinq(objectArray).toDictionary(function (o) { return o.id }, function (o) { return o.gameName }));
log('toDictionary objects', jinq(objectArray).toDictionary('id', 'gameName'));
/* /
log('toLookup numbers parameterless', jinq(numberArray).toLookup());
log('toLookup empty', jinq.empty().toLookup());
log('toLookup objects', jinq(objectArray).toLookup(function (o) { return o.trophyDifficulty }));
log('toLookup objects', jinq(objectArray).toLookup('trophyDifficulty'));
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

// Testing non-cached results
log('non-cached groupBy', groupBy.toArray());
log('non-cached select', select.toArray());
log('non-cached where', where.toArray());
log('non-cached sauce', source);
/* /
log('empty defaultIfEmpty 1337', jinq.empty().defaultIfEmpty(1337).toArray());
log('range', jinq.range(0, 10).toArray());
log('range negative', jinq.range(-9, 10).toArray());
log('repeat', jinq.repeat(1337, 5).toArray());
// Repeat instance test
var foo = { bar: 'test' };
var repeat = jinq.repeat(foo, 3);
log('repeat object', repeat.toArray());
foo.bar = 'wooop';
log('repeat object', repeat.toArray());
/* /
// Million elements stress test
var million = jinq.range(0, 1000000);
log('sum million elements', million.count());
log('max million elements', million.max());
log('max million elements', million.min());
/* */