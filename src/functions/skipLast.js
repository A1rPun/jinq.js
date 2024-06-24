export function* skipLast(source, count = 0) {
  const list = [...source];
  const skipPos = list.length - count;

  for (let i = 0; i < skipPos; i++) yield list[i];
}
