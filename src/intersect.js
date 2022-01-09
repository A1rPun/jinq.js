import { toDictionary } from './toDictionary.js';

export function* intersect(iterator, list, groupBy = (v) => v) {
  const listLookup = toDictionary(list, groupBy);

  for (const value of iterator)
    if (listLookup.has(groupBy(value))) yield value;
}
