export function aggregate(
  iterator,
  accumulator,
  seed,
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
