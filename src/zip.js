export default function* zip(generator, list, fn = (a, b) => [a, b]) {
  let i = 0;
  const checkList = [...list];

  for (const value of generator) {
    yield fn(value, checkList[i]);
    i++;
  }
}
