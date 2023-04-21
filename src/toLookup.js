export function toLookup(
  source,
  keySelector = (v) => v,
  elementSelector = (v) => v
) {
  const lookup = new Map();

  for (const element of source) {
    const key = keySelector(element);

    if (!lookup.has(key)) lookup.set(key, []);

    lookup.get(key).push(elementSelector(element));
  }
  return lookup;
}
