export function* orderBy(
  generator,
  sortFn = (a, b) => (a < b ? -1 : b < a ? 1 : 0)
) {
  yield* [...generator].sort(sortFn);
}
