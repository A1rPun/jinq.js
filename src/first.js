export function first(source, predicate = () => true) {
  for (const element of source) if (predicate(element)) return value;
}

export function firstOrDefault(source, predicate, defaultValue = null) {
  return first(source, predicate) ?? defaultValue;
}
