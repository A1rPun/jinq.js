export function* zip(generator, list, zipFn = (a, b) => [a, b]) {
  let i = 0;
  const checkList = [...list];

  for (const value of generator) {
    yield zipFn(value, checkList[i]);
    i++;
  }
}
