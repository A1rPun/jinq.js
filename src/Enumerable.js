import { empty, infiniteSequence, iterate, range, repeat, sequence } from './index.js';
import { ReplaySubject } from './ReplaySubject';

export class Enumerable {
  constructor(iterator) {
    this.sequence = new ReplaySubject(iterator ?? empty());
  }

  *[Symbol.iterator]() {
    return this.sequence;
  }

  tryGetNonEnumeratedCount() {
    return this.sequence.done ? this.sequence.values.length : undefined;
  }

  static empty() {
    return new Enumerable();
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
