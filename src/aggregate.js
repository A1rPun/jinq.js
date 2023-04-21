export function aggregate(
  iterator,
  seed,
  accumulator,
  resultSelector = (v) => v
) {
  let result = seed;
  let index = 0;

  for (const value of iterator) {
    result = result === undefined ? value : accumulator(result, value, index);
    index++;
  }

  return resultSelector(result);
}
