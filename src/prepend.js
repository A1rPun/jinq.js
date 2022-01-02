export default function* prepend(generator, ...elements) {
  yield* elements;
  yield* generator;
}
