export function* ofType(iterator, type) {
  for (const value of iterator) if (typeof value === type) yield value;
}
