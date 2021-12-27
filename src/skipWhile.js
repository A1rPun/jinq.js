export default function* skipWhile(generator, predicate = () => true) {
  let i = 0;
  let returnAll = false;

  for (const value of generator) {
    if (returnAll || !predicate(value, i)) {
      returnAll = true;
      yield value;
    }
    i++;
  }
}
