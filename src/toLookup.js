export function toLookup(iterator, groupBy = (v) => v, select = (v) => v) {
  const lookup = {};

  for (const value of iterator) {
    const key = groupBy(value);
    if (!lookup[key]) lookup[key] = [];
    lookup[key].push(select(value));
  }

  return lookup;
}
