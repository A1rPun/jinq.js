import { concat } from './concat.js';
import { distinct } from './distinct.js';

export function* union(iterator, list, comparer) {
  yield* distinct(concat(iterator, list), comparer);
}
