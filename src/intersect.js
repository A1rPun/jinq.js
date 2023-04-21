import { toDictionary } from './toDictionary.js';

export function* intersect(source, list) {
  const listLookup = toDictionary(list);

  for (const element of source) if (listLookup.has(element)) yield element;
}
