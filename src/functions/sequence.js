export function* sequence(start, endInclusive, step = 1) {
  for (let value = start; value <= endInclusive; value += step) yield value;
}
