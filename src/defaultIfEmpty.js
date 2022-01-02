export function* defaultIfEmpty(generator, defaultValue) {
  let i = 0;

  for (const value of generator) {
    yield value;
    i++;
  }
  if (!i) yield defaultValue;
}
