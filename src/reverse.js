export function* reverse(iterator) {
  yield* [...iterator].reverse();
}
