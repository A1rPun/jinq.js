export default function aggregate(
  generator,
  accumulator,
  seed,
  select = (v) => v
) {
  let result = seed;

  for (const value of generator)
    result = result === undefined ? value : accumulator(result, value);

  return select(result);
}
