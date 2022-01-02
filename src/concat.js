export function* concat(generator, list) {
  yield* generator;
  yield* list;
}
