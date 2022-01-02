export function* reverse(generator) {
  yield* [...generator].reverse();
}
