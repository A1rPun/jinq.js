export function last(iterator, predicate = () => true) {
  let last = undefined;
  for (const value of iterator) if (predicate(value)) last = value;
  return last;
}
