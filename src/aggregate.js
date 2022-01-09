export function aggregate(
  iterator,
  accumulator,
  seed = undefined,
  select = (v) => v
) {
  let result = seed;
  let index = 0;

  for (const value of iterator) {
    result = result === undefined ? value : accumulator(result, value, index);
    index++;
  }

  return select(result);
}
