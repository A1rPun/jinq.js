import * as functions from './index.js';

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

class Enumerable {
  constructor(sequence) {
    this.sequence = functions.asEnumerable(sequence);
  }

  static from(sequence) {
    return new Enumerable(sequence);
  }

  static empty() {
    return new Enumerable();
  }

  static range(start, count) {
    return new Enumerable(functions.range(start, count));
  }

  static repeat(value, count) {
    return new Enumerable(functions.repeat(value, count));
  }
}

for (const name of valueFns) {
  Enumerable.prototype[name] = function (...args) {
    return functions[name](this.sequence, ...args);
  };
}

for (const [name, fn] of Object.entries(functions)) {
  if (!Enumerable[name] && !Enumerable.prototype[name])
    Enumerable.prototype[name] = function (...args) {
      this.sequence = fn(this.sequence, ...args);
      return this;
    };
}

export { Enumerable as jinq };
