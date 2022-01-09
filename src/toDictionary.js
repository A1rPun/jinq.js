export function toDictionary(
  iterator,
  keySelector = (v) => v,
  elementSelector = (v) => v
) {
  const dictionary = new Map();

  for (const value of iterator) {
    const key = keySelector(value);

    if (!dictionary.has(key)) dictionary.set(key, elementSelector(value));
  }

  return dictionary;
}
