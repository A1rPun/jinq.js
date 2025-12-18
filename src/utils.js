export function ensureIterator(maybeIterator) {
  return maybeIterator?.[Symbol.iterator]
    ? maybeIterator
    : maybeIterator?.constructor.name === 'Object'
      ? new Map(Object.entries(maybeIterator))
      : [];
}
