export function* defaultIfEmpty(generator, defaultValue) {
  let index = 0;

  for (const value of generator) {
    yield value;
    index++;
  }
  if (!index) yield defaultValue;
}
