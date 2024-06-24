import { concat } from './concat.js';
import { distinct } from './distinct.js';

export function* union(first, second) {
  yield* distinct(concat(first, second));
}
