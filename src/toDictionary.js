export function toDictionary(iterator, groupBy = (v) => v, select = (v) => v) {
  const dictionary = {};

  for (const value of iterator) {
    const key = groupBy(value);
    if (!dictionary[key]) dictionary[key] = select(value);
  }

  return dictionary;
}
