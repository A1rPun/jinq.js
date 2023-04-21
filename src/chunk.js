export function* chunk(source, size = 1) {
  let chunk = [];
  let index = 0;

  for (const element of source) {
    chunk.push(element);
    index++;

    if (index === size) {
      yield chunk;
      index = 0;
      chunk = [];
    }
  }

  if (index) yield chunk;
}
