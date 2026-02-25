import { ReplaySubject } from './ReplaySubject.js';
import { checkOrdering, createOrderedIterator } from './ordering.js';
import * as functions from './functions/index.js';

export class Enumerable {
  constructor(iterator) {
    this.sequence = new ReplaySubject(iterator);
  }

  *[Symbol.iterator]() {
    yield* this.sequence;
  }

  tryGetNonEnumeratedCount() {
    return this.sequence.length;
  }

  static from(iterator) {
    return new Enumerable(iterator);
  }

  order(comparer) {
    return OrderedEnumerable.createOrderedEnumerable(this.sequence, x => x, comparer, true);
  }

  orderDescending(comparer) {
    return OrderedEnumerable.createOrderedEnumerable(this.sequence, x => x, comparer, false);
  }

  orderBy(keySelector, comparer) {
    return OrderedEnumerable.createOrderedEnumerable(this.sequence, keySelector, comparer, true);
  }

  orderByDescending(keySelector, comparer) {
    return OrderedEnumerable.createOrderedEnumerable(this.sequence, keySelector, comparer, false);
  }
}

export class OrderedEnumerable extends Enumerable {
  constructor(iterator) {
    super(iterator);
  }

  *[Symbol.iterator]() {
    yield* checkOrdering(this.sequence);
  }

  static createOrderedEnumerable(...args) {
    return new OrderedEnumerable(createOrderedIterator(...args));
  }

  thenBy(keySelector, comparer) {
    return OrderedEnumerable.createOrderedEnumerable(this.sequence, keySelector, comparer, true);
  }

  thenByDescending(keySelector, comparer) {
    return OrderedEnumerable.createOrderedEnumerable(this.sequence, keySelector, comparer, false);
  }
}

const staticFunctions = [
  'empty',
  'infiniteSequence',
  'iterate',
  'range',
  'repeat',
  'sequence',
];

for (const [name, fn] of Object.entries(functions)) {
  if (staticFunctions.includes(name)) {
    Enumerable[name] = function (...args) {
      return new Enumerable(fn(...args));
    };
  } else if (fn.constructor.name === 'GeneratorFunction') {
    Enumerable.prototype[name] = function (...args) {
      return new Enumerable(fn(this, ...args));
    };
  } else {
    Enumerable.prototype[name] = function (...args) {
      return fn(this, ...args);
    };
  }
}
