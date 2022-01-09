export function toDictionary(iterator, groupBy = (v) => v, select = (v) => v) {
  const dictionary = new Map();

  for (const value of iterator) {
    const key = groupBy(value);

    if (!dictionary.has(key)) dictionary.set(key, select(value));
  }

  return dictionary;
}
