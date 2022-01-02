export function* chunk(generator, size) {
  let chunk = [];
  let i = 0;

  for (const value of generator) {
    chunk.push(value);
    i++;

    if (i === size) {
      yield chunk;
      i = 0;
      chunk = [];
    }
  }

  if (i) yield chunk;
}
