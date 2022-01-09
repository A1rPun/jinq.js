import { toLookup } from './toLookup.js';

export function* groupBy(iterator, groupBy = (v) => v, select = (v) => v) {
  const groups = toLookup(iterator, groupBy, select);

  for (const [key, value] of Object.entries(groups)) yield { key, value };
}
