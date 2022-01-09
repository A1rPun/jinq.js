export function* select(iterator, select = (v) => v) {
  for (const value of iterator) yield select(value);
}
