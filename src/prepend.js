export function* prepend(iterator, ...elements) {
  yield* elements;
  yield* iterator;
}
