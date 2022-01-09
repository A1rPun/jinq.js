export function* chunk(iterator, size = 1) {
  let chunk = [];
  let index = 0;

  for (const value of iterator) {
    chunk.push(value);
    index++;

    if (index === size) {
      yield chunk;
      index = 0;
      chunk = [];
    }
  }

  if (index) yield chunk;
}
