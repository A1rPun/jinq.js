import { toDictionary } from './toDictionary.js';

export function* exceptBy(source, list, keySelector = (v) => v) {
  const listLookup = toDictionary(list, keySelector);

  for (const element of source)
    if (!listLookup.has(keySelector(element))) yield element;
}
