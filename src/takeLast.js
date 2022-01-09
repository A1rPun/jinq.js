export function* takeLast(iterator, count = 0) {
  const result = [];
  for (const value of iterator) result.push(value);
  const skipPos = result.length - count;
  for (let i = skipPos < 0 ? 0 : skipPos; i < result.length; i++) yield result[i];
}
