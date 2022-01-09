import { toLookup } from './toLookup.js';

export function* groupBy(iterator, groupBy = (v) => v, select = (v) => v) {
  const iteratorLookup = toLookup(iterator, groupBy, select);

  for (const [key, value] of iteratorLookup.entries()) yield { key, value };
}
