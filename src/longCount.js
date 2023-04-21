export function longCount(iterator, predicate = () => true) {
  let count = 0n;
  for (const value of iterator) if (predicate(value)) count += 1n;
  return count;
}
