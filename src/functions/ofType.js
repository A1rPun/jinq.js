export function* ofType(source, type) {
  for (const element of source) if (typeof element === type) yield element;
}
