export function aggregateBy(
  source,
  keySelector = (v) => v,
  seed,
  accumulator
) {
  const dictionary = new Map();

  for (const element of source) {
    const key = keySelector(element);
    const value = dictionary.has(key)
      ? dictionary.get(key)
      : seed;
    dictionary.set(key, accumulator(value, element));
  }
  return dictionary;
}
