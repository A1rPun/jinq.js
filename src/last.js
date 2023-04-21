export function last(source, predicate = () => true) {
  let last = undefined;
  for (const element of source) if (predicate(element)) last = element;
  return last;
}

export function lastOrDefault(source, predicate, defaultValue = null) {
  return last(source, predicate) ?? defaultValue;
}
