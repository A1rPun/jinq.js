import { concat } from './concat.js';
import { distinct } from './distinct.js';

export function* union(generator, list) {
  yield* distinct(concat(generator, list));
}
