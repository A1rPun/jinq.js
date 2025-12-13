export function* iterate(seed, resultSelector = (v) => v) {
  let result = seed;

  while (true) {
    yield result;
    result = resultSelector(result);
  }
}
