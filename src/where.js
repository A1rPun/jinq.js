export function* where(iterator, predicate = () => true) {
  let index = 0;
  for (const value of iterator) {
    if (predicate(value, index)) yield value;
    index++;
  }
}
