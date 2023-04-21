export function* takeLast(source, count = 0) {
  const list = [...source];
  const skipPos = list.length - count;

  for (let i = skipPos < 0 ? 0 : skipPos; i < list.length; i++)
    yield list[i];
}
