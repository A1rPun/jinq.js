import { concat } from './concat.js';
import { distinct } from './distinct.js';

export function* union(source, list, comparer) {
  yield* distinct(concat(source, list), comparer);
}
