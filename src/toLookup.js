export function toLookup(
  iterator,
  keySelector = (v) => v,
  elementSelector = (v) => v
) {
  const lookup = new Map();

  for (const value of iterator) {
    const key = keySelector(value);

    if (!lookup.has(key)) lookup.set(key, []);

    lookup.get(key).push(elementSelector(value));
  }

  return lookup;
}
