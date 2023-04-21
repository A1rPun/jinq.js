export function contains(source, value, comparer = (a, b) => a === b) {
  for (const element of source) if (comparer(value, element)) return true;
  return false;
}
