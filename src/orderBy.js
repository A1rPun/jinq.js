export function* orderBy(generator, sortFn = undefined) {
  yield* [...generator].sort(sortFn);
}
