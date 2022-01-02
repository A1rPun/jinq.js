import { toDictionary } from './toDictionary.js';

export function* except(generator, list, groupBy = (v) => v) {
  const genLookup = toDictionary(generator, groupBy);
  const listLookup = toDictionary(list, groupBy);

  for (const prop in genLookup)
    if (listLookup[prop] === undefined) yield genLookup[prop];
}
