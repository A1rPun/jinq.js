export function* select(iterator, selector = (v) => v) {
  let index = 0;
  for (const value of iterator) {
    yield selector(value, index);
    index++;
  }
}
