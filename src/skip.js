export function* skip(generator, skip = 0) {
  let i = 0;

  for (const value of generator) {
    if (i >= skip) yield value;
    i++;
  }
}
