export function* where(source, predicate = () => true) {
  let index = 0;
  for (const element of source) {
    if (predicate(element, index)) yield element;
    index++;
  }
}
