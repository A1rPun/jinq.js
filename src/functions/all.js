export function all(source, predicate = () => true) {
  for (const element of source) if (!predicate(element)) return false;
  return true;
}
