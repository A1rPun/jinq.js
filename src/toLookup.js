export function toLookup(generator, groupBy = (v) => v, select = (v) => v) {
  const lookup = {};

  for (const value of generator) {
    const key = groupBy(value);
    if (!lookup[key]) lookup[key] = [];
    lookup[key].push(select(value));
  }

  return lookup;
}
