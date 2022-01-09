export function* where(iterator, predicate = () => true) {
  for (const value of iterator) if (predicate(value)) yield value;
}
