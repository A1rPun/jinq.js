export function any(generator, predicate = () => true) {
  for (const value of generator) if (predicate(value)) return true;

  return false;
}
