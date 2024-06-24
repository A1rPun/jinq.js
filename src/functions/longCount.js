export function longCount(source, predicate = () => true) {
  let count = 0n;
  for (const element of source) if (predicate(element)) count += 1n;
  return count;
}
