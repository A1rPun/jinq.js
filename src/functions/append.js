export function* append(source, ...elements) {
  yield* source ?? [];
  yield* elements;
}
