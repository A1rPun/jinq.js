import { toLookup } from './toLookup.js';

export function* leftJoin(
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

    if (listLookup.has(outer)) {
      for (const inner of listLookup.get(outer))
        yield resultSelector(element, inner);
    } else {
      yield resultSelector(element, {});
    }
  }
}
