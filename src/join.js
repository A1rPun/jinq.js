import { toDictionary } from './toDictionary.js';
import { toLookup } from './toLookup.js';

export function* join(
  iterator,
  list,
  outerKey,
  innerKey,
  select = (a, b) => ({ ...a, ...b })
) {
  const genLookup = toDictionary(iterator, outerKey);
  const listLookup = toLookup(list, innerKey);

  for (const [outer, value] of genLookup.entries())
    if (listLookup.has(outer))
      for (const inner of listLookup.get(outer)) yield select(value, inner);
}
