import { ensureIterator } from './utils.js';

export class ReplaySubject {
  constructor(iterator) {
    this.done = false;
    this.values = Array.isArray(iterator) ? iterator : [];
    this.sequence = ensureIterator(iterator);
  }

  *[Symbol.iterator]() {
    yield* this.values;

    if (Array.isArray(this.sequence)) return;

    let genNext;

    while (!(genNext = this.sequence.next()).done) {
      this.values.push(genNext.value);
      yield genNext.value;
    }
    this.done = true;
  }
}
