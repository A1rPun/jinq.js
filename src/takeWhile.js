export function* takeWhile(generator, predicate = () => true) {
  let i = 0;

  for (const value of generator) {
    if (predicate(value, i)) yield value;
    else return;
    i++;
  }
}
