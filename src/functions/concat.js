export function* concat(first, second) {
  yield* first ?? [];
  yield* second ?? [];
}
