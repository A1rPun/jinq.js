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

  for (const outer in genLookup)
    if (listLookup[outer]) yield select(genLookup[outer], listLookup[outer]);
}
