import { concat } from './concat.js';
import { distinct } from './distinct.js';

export function* union(source, list) {
  yield* distinct(concat(source, list));
}
