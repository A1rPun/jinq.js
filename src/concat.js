export function* concat(iterator, list) {
  yield* iterator;
  yield* list;
}
