export function contains(iterator, element) {
  for (const value of iterator) if (value === element) return true;

  return false;
}
