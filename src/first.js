export function first(generator, predicate = () => true) {
  for (const value of generator) if (predicate(value)) return value;
}
