export function all(iterator, predicate = () => true) {
  for (const value of iterator) if (!predicate(value)) return false;
  return true;
}
