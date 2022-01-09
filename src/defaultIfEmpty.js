export function* defaultIfEmpty(iterator, defaultValue) {
  let index = 0;

  for (const value of iterator) {
    yield value;
    index++;
  }
  if (!index) yield defaultValue;
}
