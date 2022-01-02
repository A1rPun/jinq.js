import { toLookup } from './toLookup.js';

export function* groupBy(generator, groupBy = (v) => v, select = (v) => v) {
  const groups = toLookup(generator, groupBy, select);

  for (const [key, value] of Object.entries(groups)) yield { key, value };
}
