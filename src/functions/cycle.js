export function* cycle(source) {
  if (!source) return;
  let iterable = source;
  let result = [];

  while (true) {
    if (result.length) {
      yield* result;
    } else {
      for (const element of iterable) {
        yield element;
        result.push(element);
      }
      if (!result.length) break;
      iterable = result;
    }
  }
}
