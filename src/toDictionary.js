export function toDictionary(
  source,
  keySelector = (v) => v,
  elementSelector = (v) => v
) {
  const dictionary = new Map();

  for (const element of source) {
    const key = keySelector(element);

    if (!dictionary.has(key)) dictionary.set(key, elementSelector(element));
  }
  return dictionary;
}
