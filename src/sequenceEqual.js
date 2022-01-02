export function sequenceEqual(generator, list) {
  let i = 0;
  const checkList = [...list];

  for (const value of generator) {
    if (value !== checkList[i]) return false;
    i++;
  }

  return i === checkList.length;
}
