export function contains(iterator, element, comparer = (a, b) => a === b) {
  for (const value of iterator) if (comparer(value, element)) return true;

  return false;
}
