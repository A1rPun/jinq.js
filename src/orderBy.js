export function* orderBy(generator) {
  yield* [...generator].sort();
}
