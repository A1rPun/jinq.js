import { toLookup } from './toLookup.js';

export function* join(
  iterator,
  list,
  outerKey,
  innerKey,
  select = (a, b) => ({ ...a, ...b })
) {
  const iteratorLookup = new Set();
  const listLookup = toLookup(list, innerKey);

  for (const value of iterator) {
    const outer = outerKey(value);

    if (iteratorLookup.has(outer)) continue;

    iteratorLookup.add(outer);

    if (!listLookup.has(outer)) continue;

    for (const inner of listLookup.get(outer)) yield select(value, inner);
  }
}
