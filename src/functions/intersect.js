import { toDictionary } from './toDictionary.js';

export function* intersect(first, second) {
  const listLookup = toDictionary(second);

  for (const element of first)
    if (listLookup.has(element)) yield element;
}
