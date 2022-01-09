export function* skip(iterator, skip = 0) {
  let index = 0;

  for (const value of iterator) {
    if (index >= skip) yield value;
    index++;
  }
}
