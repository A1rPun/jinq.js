export function* take(generator, take = 0) {
  let index = 0;

  for (const value of generator) {
    if (index < take) yield value;
    else return;
    index++;
  }
}
