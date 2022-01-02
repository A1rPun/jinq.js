export function* skipLast(generator, count = 0) {
  const result = [];
  for (const value of generator) result.push(value);
  const skipPos = result.length - count;
  for (let i = 0; i < skipPos; i++) yield result[i];
}
