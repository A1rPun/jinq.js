export function first(iterator, predicate = () => true) {
  for (const value of iterator) if (predicate(value)) return value;
}
