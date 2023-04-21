import { toLookup } from './toLookup.js';

export function* join(
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

    for (const inner of listLookup.get(outer))
      yield resultSelector(element, inner);
  }
}
