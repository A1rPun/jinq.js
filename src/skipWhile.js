export function* skipWhile(generator, predicate = () => true) {
  let index = 0;
  let returnAll = false;

  for (const value of generator) {
    if (returnAll || !predicate(value, index)) {
      returnAll = true;
      yield value;
    }
    index++;
  }
}
