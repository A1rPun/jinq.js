export default function* reverse(generator) {
  yield* [...generator].reverse();
}
