export default function* append(generator, ...elements) {
  yield* generator;
  yield* elements;
}
