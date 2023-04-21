import { toLookup } from './toLookup.js';

export function* groupBy(
  source,
  keySelector,
  elementSelector,
  resultSelector = (v) => v
) {
  const sourceLookup = toLookup(source, keySelector, elementSelector);

  for (const [key, value] of sourceLookup.entries())
    yield resultSelector({ key, value });
}
