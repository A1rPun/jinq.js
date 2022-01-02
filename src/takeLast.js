export function* takeLast(generator, count = 0) {
  const result = [];
  for (const value of generator) result.push(value);
  const skipPos = result.length - count;
  for (let i = skipPos; i < result.length; i++) yield result[i];
}
