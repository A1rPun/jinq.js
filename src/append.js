export function* append(iterator, ...elements) {
  yield* iterator;
  yield* elements;
}
