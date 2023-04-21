export function* skip(source, skip = 0) {
  let index = 0;

  for (const element of source) {
    if (index >= skip) yield element;
    index++;
  }
}
