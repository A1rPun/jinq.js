import { orderBy } from './orderBy.js';

export function* orderByDescending(
  generator,
  sortFn = (a, b) => (a > b ? -1 : b > a ? 1 : 0)
) {
  yield* orderBy(generator, sortFn);
}
