export function* orderBy(
  iterator,
  sortFn = (a, b) => (a < b ? -1 : b < a ? 1 : 0)
) {
  yield* [...iterator].sort(sortFn);
}
