import { concat } from './concat.js';
import { distinctBy } from './distinctBy.js';

export function* unionBy(iterator, list, keySelector, comparer) {
  yield* distinctBy(concat(iterator, list), keySelector, comparer);
}
