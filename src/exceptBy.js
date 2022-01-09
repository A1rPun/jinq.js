import { toDictionary } from './toDictionary.js';

export function* exceptBy(iterator, list, keySelector = (v) => v) {
  const listLookup = toDictionary(list, keySelector);

  for (const value of iterator)
    if (!listLookup.has(keySelector(value))) yield value;
}
