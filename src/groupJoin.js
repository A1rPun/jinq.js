import { toDictionary } from './toDictionary.js';
import { toLookup } from './toLookup.js';

export function* groupJoin(
  iterator,
  list,
  outerKey,
  innerKey,
  select = (a, b) => ({ ...a, ...b })
) {
  const genLookup = toDictionary(iterator, outerKey);
  const listLookup = toLookup(list, innerKey);

  for (const [outer, value] of genLookup.entries())
    if (listLookup.has(outer)) yield select(value, listLookup.get(outer));
}
