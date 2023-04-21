export function* defaultIfEmpty(source, defaultValue) {
  let index = 0;

  for (const element of source) {
    yield element;
    index++;
  }
  if (!index) yield defaultValue;
}
