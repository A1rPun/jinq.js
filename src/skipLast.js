export function* skipLast(iterator, count = 0) {
  const list = [...iterator];
  const skipPos = list.length - count;

  for (let i = 0; i < skipPos; i++) yield list[i];
}
