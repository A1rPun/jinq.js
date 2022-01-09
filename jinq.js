import * as functions from './index.js';

const valueFunctions = [
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

const replaySequence = (sequence) => ({
  values: [],
  *[Symbol.iterator]() {
    yield* this.values;

    let genList = functions.asEnumerable(sequence);
    let genNext;

    while (!(genNext = genList.next()).done) {
      this.values.push(genNext.value);
      yield genNext.value;
    }
  },
});

class Enumerable {
  constructor(sequence) {
    this.sequence = replaySequence(sequence ?? functions.empty());
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

for (const name of valueFunctions) {
  Enumerable.prototype[name] = function (...args) {
    return functions[name](this.sequence, ...args);
  };
}

for (const [name, fn] of Object.entries(functions)) {
  if (!Enumerable[name] && !Enumerable.prototype[name])
    Enumerable.prototype[name] = function (...args) {
      return new Enumerable(fn(this.sequence, ...args));
    };
}

export { Enumerable as jinq };
