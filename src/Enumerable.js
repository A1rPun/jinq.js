import { empty, infiniteSequence, iterate, range, repeat, sequence } from './index.js';
import { ReplaySubject } from './ReplaySubject.js';

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

  static empty() {
    return new Enumerable(empty());
  }

  static from(iterator) {
    return new Enumerable(iterator);
  }

  static infiniteSequence(start, step) {
    return new Enumerable(infiniteSequence(start, step));
  }

  static iterate(seed, selector) {
    return new Enumerable(iterate(seed, selector));
  }

  static range(start, count) {
    return new Enumerable(range(start, count));
  }

  static repeat(value, count) {
    return new Enumerable(repeat(value, count));
  }

  static sequence(start, endInclusive, step) {
    return new Enumerable(sequence(start, endInclusive, step));
  }
}
