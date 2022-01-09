import { concat } from './concat.js';
import { distinct } from './distinct.js';

export function* union(iterator, list, keySelector, comparer) {
  yield* distinct(concat(iterator, list), keySelector, comparer);
}
