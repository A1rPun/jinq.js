export function* concat(source, list) {
  yield* source;
  yield* list;
}
