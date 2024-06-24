import { concat } from './concat.js';
import { distinctBy } from './distinctBy.js';

export function* unionBy(first, second, keySelector) {
  yield* distinctBy(concat(first, second), keySelector);
}
