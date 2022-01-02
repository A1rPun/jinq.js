export function* select(generator, select = (v) => v) {
  for (const value of generator) yield select(value);
}
