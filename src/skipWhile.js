export function* skipWhile(iterator, predicate = () => true) {
  let index = 0;
  let returnAll = false;

  for (const value of iterator) {
    if (returnAll || !predicate(value, index)) {
      returnAll = true;
      yield value;
    }
    index++;
  }
}
