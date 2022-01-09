import { toLookup } from './toLookup.js';

export function* groupJoin(
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

    yield resultSelector(value, listLookup.get(outer));
  }
}
