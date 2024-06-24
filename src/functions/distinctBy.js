export function* distinctBy(source, keySelector = (v) => v) {
  const lookup = new Set();

  for (const element of source) {
    const key = keySelector(element);

    if (lookup.has(key)) continue;

    lookup.add(key);
    yield element;
  }
}
