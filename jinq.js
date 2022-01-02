import * as functions from './index.js';

const staticFns = ['empty', 'range', 'repeat'];
const valueFns = [
  'aggregate',
  'all',
  'any',
  'average',
  'contains',
  'count',
  'elementAt',
  'elementAtOrDefault',
  'first',
  'firstOrDefault',
  'last',
  'lastOrDefault',
  'longCount',
  'max',
  'maxBy',
  'min',
  'minBy',
  'sequenceEqual',
  'single',
  'singleOrDefault',
  'sum',
  'toArray',
  'toDictionary',
  'toHashSet',
  'toList',
  'toLookup',
];

class Jinq {
  constructor(list) {
    this.list = list;
  }
}

const jinq = function (list) {
  return new Jinq(list);
};

for (const name of staticFns) {
  jinq[name] = functions[name];
}

for (const name of valueFns) {
  Jinq.prototype[name] = function (...args) {
    return functions[name](this.list, ...args);
  };
}

for (const [name, fn] of Object.entries(functions)) {
  if (!Jinq.prototype[name])
    Jinq.prototype[name] = function (...args) {
      this.list = fn(this.list, ...args);
      return this;
    };
}

export { jinq };
