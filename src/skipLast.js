export function* skipLast(iterator, count = 0) {
  const result = [];
  for (const value of iterator) result.push(value);
  const skipPos = result.length - count;
  for (let i = 0; i < skipPos; i++) yield result[i];
}
