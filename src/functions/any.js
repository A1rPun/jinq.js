export function any(source, predicate = () => true) {
  for (const element of source) if (predicate(element)) return true;
  return false;
}
