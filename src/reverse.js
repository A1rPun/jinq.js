export function* reverse(source) {
  yield* [...source].reverse();
}
