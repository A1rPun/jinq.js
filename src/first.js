export function first(iterator, predicate = () => true) {
  for (const value of iterator) if (predicate(value)) return value;
}

export function firstOrDefault(iterator, predicate, defaultValue = null) {
  return first(iterator, predicate) ?? defaultValue;
}
