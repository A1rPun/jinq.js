export function* takeLast(iterator, count = 0) {
  const list = [...iterator];
  const skipPos = list.length - count;

  for (let i = skipPos < 0 ? 0 : skipPos; i < list.length; i++)
    yield list[i];
}
