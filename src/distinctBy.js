export function* distinctBy(iterator, keySelector = (v) => v) {
  const lookup = new Set();

  for (const value of iterator) {
    const key = keySelector(value);

    if (lookup.has(key)) continue;

    lookup.add(key);
    yield value;
  }
}
