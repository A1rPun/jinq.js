import { toDictionary } from './toDictionary.js';

export function* intersect(generator, list, groupBy = (v) => v) {
  const listLookup = toDictionary(list, groupBy);

  for (const value of generator)
    if (listLookup[groupBy(value)] !== undefined) yield value;
}
