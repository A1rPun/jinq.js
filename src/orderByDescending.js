import { orderBy } from './orderBy.js';

export function* orderByDescending(
  iterator,
  sortFn = (a, b) => (a > b ? -1 : b > a ? 1 : 0)
) {
  yield* orderBy(iterator, sortFn);
}
