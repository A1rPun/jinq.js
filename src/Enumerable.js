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

  static from(iterator) {
    return new Enumerable(iterator);
  }
}
