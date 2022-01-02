export default function* orderBy(generator) {
  yield* [...generator].sort();
}
