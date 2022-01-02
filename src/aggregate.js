export function aggregate(
  generator,
  accumulator,
  seed = undefined,
  select = (v) => v
) {
  let result = seed;
  let index = 0;

  for (const value of generator) {
    result = result === undefined ? value : accumulator(result, value, index);
    index++;
  }

  return select(result);
}
