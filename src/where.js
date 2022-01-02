export function* where(generator, predicate = () => true) {
  for (const value of generator) if (predicate(value)) yield value;
}
