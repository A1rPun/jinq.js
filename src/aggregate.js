export function aggregate(
  source,
  seed,
  accumulator,
  resultSelector = (v) => v
) {
  let result = seed;
  let index = 0;

  for (const element of source) {
    result = accumulator(result, element, index);
    index++;
  }
  return resultSelector(result);
}
