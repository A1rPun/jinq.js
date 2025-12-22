export function* prepend(source, ...elements) {
  yield* elements;
  yield* source ?? [];
}
