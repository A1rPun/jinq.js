export function* distinct(iterator) {
  const lookup = new Set();

  for (const value of iterator) {
    if (lookup.has(value)) continue;

    lookup.add(value);
    yield value;
  }
}
