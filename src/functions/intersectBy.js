import { toDictionary } from './toDictionary.js';

export function* intersectBy(first, second, keySelector = (v) => v) {
  const listLookup = toDictionary(second, keySelector);

  for (const element of first)
    if (listLookup.has(keySelector(element))) yield element;
}
