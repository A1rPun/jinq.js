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
  done: false,
  *[Symbol.iterator]() {
    yield* this.values;

    if (this.done) return;

    let genList = functions.asEnumerable(sequence);
    let genNext;

    while (!(genNext = genList.next()).done) {
      this.values.push(genNext.value);
      yield genNext.value;
    }
    this.done = true;
  },
});

class Enumerable {
  constructor(sequence) {
    this.sequence = replaySequence(sequence ?? functions.empty());
  }

  *[Symbol.iterator]() {
    return this.sequence;
  }

  tryGetNonEnumeratedCount() {
    return this.sequence.done ? this.sequence.values.length : undefined;
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
