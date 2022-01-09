import { toLookup } from './toLookup.js';

export function* groupBy(
  iterator,
  keySelector,
  elementSelector,
  resultSelector = (v) => v
) {
  const iteratorLookup = toLookup(iterator, keySelector, elementSelector);

  for (const [key, value] of iteratorLookup.entries())
    yield resultSelector({ key, value });
}
