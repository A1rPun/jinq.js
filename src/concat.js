export default function* concat(generator, list) {
  yield* generator;
  yield* list;
}
