export function* distinct(source) {
  const lookup = new Set();

  for (const element of source) {
    if (lookup.has(element)) continue;

    lookup.add(element);
    yield element;
  }
}
