export function* skip(generator, skip = 0) {
  let index = 0;

  for (const value of generator) {
    if (index >= skip) yield value;
    index++;
  }
}
