export function* takeWhile(source, predicate = () => true) {
  let index = 0;

  for (const element of source) {
    if (predicate(element, index)) yield element;
    else return;
    index++;
  }
}
