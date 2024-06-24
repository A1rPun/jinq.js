export function count(source, predicate = () => true) {
  let count = 0;
  for (const element of source) if (predicate(element)) count++;
  return count;
}
