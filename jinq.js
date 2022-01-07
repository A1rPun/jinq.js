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
    this.sequence = replaySequence(sequence ?? functions.empty());
    this.values = [];
    this.queue = [];
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
    let currentSequence = this.sequence;

    for (const { fn, args: fnArgs } of this.queue) {
      currentSequence = fn(currentSequence, ...fnArgs);
    }
    return functions[name](currentSequence, ...args);
  };
}

for (const [name, fn] of Object.entries(functions)) {
  if (!Enumerable[name] && !Enumerable.prototype[name])
    Enumerable.prototype[name] = function (...args) {
      return cloneEnumerable(this, { fn, args });
    };
}

function replaySequence(sequence) {
  return sequence.values
    ? sequence
    : {
        values: [],
        *[Symbol.iterator]() {
          yield* this.values;

          for (const value of sequence) {
            this.values.push(value);
            yield value;
          }
        },
      };
}

function cloneEnumerable(enumerable, next) {
  const clone = new Enumerable(enumerable.sequence);
  clone.queue = [...enumerable.queue, next];
  return clone;
}

export { Enumerable as jinq };
