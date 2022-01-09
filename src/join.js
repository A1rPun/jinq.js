import { toLookup } from './toLookup.js';

export function* join(
  iterator,
  list,
  outerKeySelector,
  innerKeySelector,
  resultSelector = (a, b) => ({ ...a, ...b })
) {
  const iteratorLookup = new Set();
  const listLookup = toLookup(list, innerKeySelector);

  for (const value of iterator) {
    const outer = outerKeySelector(value);

    if (iteratorLookup.has(outer)) continue;

    iteratorLookup.add(outer);

    if (!listLookup.has(outer)) continue;

    for (const inner of listLookup.get(outer))
      yield resultSelector(value, inner);
  }
}
