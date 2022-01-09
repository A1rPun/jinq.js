export function* take(iterator, take = 0) {
  if (take < 1) return;

  let index = 0;

  for (const value of iterator) {
    yield value;
    index++;
    if (index >= take) return;
  }
}
