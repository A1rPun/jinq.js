export function toLookup(iterator, groupBy = (v) => v, select = (v) => v) {
  const lookup = new Map();

  for (const value of iterator) {
    const key = groupBy(value);
    if (!lookup.has(key)) lookup.set(key, []);
    lookup.get(key).push(select(value));
  }

  return lookup;
}
