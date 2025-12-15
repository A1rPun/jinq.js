export function* infiniteSequence(start, step = 1) {
  let result = start;

  while (true) {
    yield result;
    result += step;
  }
}
