import { toLookup } from './toLookup.js';

export function* groupBy(
  source,
  keySelector,
  elementSelector,
  resultSelector = (key, value) => ({ key, value })
) {
  const sourceLookup = toLookup(source, keySelector, elementSelector);

  for (const [key, value] of sourceLookup.entries())
    yield resultSelector(key, value);
}
