export function* takeWhile(generator, predicate = () => true) {
  let index = 0;

  for (const value of generator) {
    if (predicate(value, index)) yield value;
    else return;
    index++;
  }
}
