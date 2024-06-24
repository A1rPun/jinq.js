import { concat } from './concat.js';
import { distinctBy } from './distinctBy.js';

export function* unionBy(source, list, keySelector) {
  yield* distinctBy(concat(source, list), keySelector);
}
