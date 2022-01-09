import { toDictionary } from './toDictionary.js';

export function* except(iterator, list) {
  const listLookup = toDictionary(list);

  for (const value of iterator)
    if (!listLookup.has(value)) yield value;
}
