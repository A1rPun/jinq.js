export function any(iterator, predicate = () => true) {
  for (const value of iterator) if (predicate(value)) return true;

  return false;
}
