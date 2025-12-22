export class ReplaySubject {
  constructor(iterator) {
    this.done = Array.isArray(iterator);
    this.values = this.done ? iterator : [];
    this.sequence = ensureIterator(iterator);
  }

  *[Symbol.iterator]() {
    yield* this.values;

    if (this.done) return;

    let genNext;

    while (!(genNext = this.sequence.next()).done) {
      this.values.push(genNext.value);
      yield genNext.value;
    }
    this.done = true;
  }

  get length() {
    return this.done ? this.values.length : undefined;
  }
}

function ensureIterator(maybeIterator) {
  return maybeIterator?.constructor?.name === 'Object'
    ? new Map(Object.entries(maybeIterator))[Symbol.iterator]()
    : maybeIterator?.[Symbol.iterator]?.() ?? [];
}
