export default function* orderByDescending(generator) {
  yield* [...generator].sort((a, b) => (a > b ? -1 : b > a ? 1 : 0));
}
