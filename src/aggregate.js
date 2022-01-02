export function aggregate(generator, accumulator, seed = undefined, select = (v) => v) {
  let result = seed;

  for (const value of generator)
    result = result === undefined ? value : accumulator(result, value);

  return select(result);
}
