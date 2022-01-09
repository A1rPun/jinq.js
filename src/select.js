export function* select(iterator, selector = (v) => v) {
  for (const value of iterator) yield selector(value);
}
