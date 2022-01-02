export function all(generator, predicate = () => true) {
  for (const value of generator) if (!predicate(value)) return false;
  return true;
}
