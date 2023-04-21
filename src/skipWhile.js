export function* skipWhile(source, predicate = () => true) {
  let index = 0;
  let returnAll = false;

  for (const element of source) {
    if (returnAll || !predicate(element, index)) {
      returnAll = true;
      yield element;
    }
    index++;
  }
}
