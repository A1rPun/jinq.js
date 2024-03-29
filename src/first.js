export function first(source, predicate = () => true) {
  for (const element of source) if (predicate(element)) return element;
}

export function firstOrDefault(source, predicate, defaultValue) {
  return first(source, predicate) ?? defaultValue;
}
