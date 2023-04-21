export function* select(source, selector = (v) => v) {
  let index = 0;
  for (const element of source) {
    yield selector(element, index);
    index++;
  }
}
