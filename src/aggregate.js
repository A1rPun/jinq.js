export default function aggregate(generator, accumulator, seed, select = (v) => v) {
  let aggregation = seed;

  for (const value of generator) {
    aggregation =
      aggregation === undefined ? value : accumulator(aggregation, value);
  }
  return select(aggregation);
}
