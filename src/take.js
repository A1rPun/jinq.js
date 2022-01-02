export function* take(generator, take = 0) {
  let i = 0;

  for (const value of generator) {
    if (i < take) yield value;
    else return;
    i++;
  }
}
