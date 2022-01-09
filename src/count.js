export function count(iterator, predicate = () => true) {
  let count = 0;
  for (const value of iterator) if (predicate(value)) count++;
  return count;
}
