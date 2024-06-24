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

    const genList = asEnumerable(this.sequence);
    let genNext;

    while (!(genNext = genList.next()).done) {
      this.values.push(genNext.value);
      yield genNext.value;
    }
    this.done = true;
  }
}
