import { toDictionary } from './toDictionary.js';

export function* intersect(iterator, list) {
  const listLookup = toDictionary(list);

  for (const value of iterator) if (listLookup.has(value)) yield value;
}
