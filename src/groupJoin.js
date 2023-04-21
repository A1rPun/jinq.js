import { toLookup } from './toLookup.js';

export function* groupJoin(
  source,
  list,
  outerKeySelector,
  innerKeySelector,
  resultSelector = (a, b) => ({ ...a, ...b })
) {
  const sourceLookup = new Set();
  const listLookup = toLookup(list, innerKeySelector);

  for (const element of source) {
    const outer = outerKeySelector(element);

    if (sourceLookup.has(outer)) continue;

    sourceLookup.add(outer);

    if (!listLookup.has(outer)) continue;

    yield resultSelector(element, listLookup.get(outer));
  }
}
