export function* take(generator, take = 0) {
  if (take < 1) return;

  let index = 0;

  for (const value of generator) {
    yield value;
    index++;
    if (index >= take) return;
  }
}
