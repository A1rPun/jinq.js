import { concat } from './concat.js';
import { distinct } from './distinct.js';

export function* union(iterator, list, keySelector) {
  yield* distinct(concat(iterator, list), keySelector);
}
