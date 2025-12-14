import { asEnumerable } from './index.js';

export class ReplaySubject {
  constructor(iterator) {
    this.done = false;
    this.values = Array.isArray(iterator) ? iterator : [];
    this.sequence = iterator;
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
