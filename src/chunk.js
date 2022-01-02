export function* chunk(generator, size) {
  let chunk = [];
  let index = 0;

  for (const value of generator) {
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
