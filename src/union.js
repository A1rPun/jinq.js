import { concat } from './concat.js';
import { distinct } from './distinct.js';

export function* union(iterator, list) {
  yield* distinct(concat(iterator, list));
}
