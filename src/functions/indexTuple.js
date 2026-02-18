export function* index(source) {
  let index = 0;
  for (const element of source) {
    yield [index, element];
    index++;
  }
}
