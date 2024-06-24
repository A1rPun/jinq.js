export function* take(source, take = 0) {
  if (take < 1) return;

  let index = 0;

  for (const element of source) {
    yield element;
    index++;
    if (index >= take) return;
  }
}
