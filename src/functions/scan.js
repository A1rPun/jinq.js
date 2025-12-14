export function* scan(
  source,
  seed,
  accumulator
) {
  let result = seed;
  let index = 0;

  for (const element of source) {
    result = accumulator(result, element, index);
    yield result;
    index++;
  }
}
