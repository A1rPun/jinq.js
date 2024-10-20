export function countBy(source, keySelector = (v) => v) {
  const dictionary = new Map();

  for (const element of source) {
    const key = keySelector(element);
    const value = dictionary.has(key)
      ? dictionary.get(key) + 1
      : 1;
    dictionary.set(key, value);
  }
  return dictionary;
}
