import { toLookup } from './toLookup.js';

export function* join(
  outer,
  inner,
  outerKeySelector,
  innerKeySelector,
  resultSelector = (a, b) => ({ ...a, ...b })
) {
  const sourceLookup = new Set();
  const listLookup = toLookup(inner, innerKeySelector);

  for (const element of outer) {
    const outer = outerKeySelector(element);

    if (sourceLookup.has(outer)) continue;

    sourceLookup.add(outer);

    if (!listLookup.has(outer)) continue;

    for (const inner of listLookup.get(outer))
      yield resultSelector(element, inner);
  }
}
