export function* selectMany(
  iterator,
  collectionSelector = (v) => v,
  resultSelector = (_, v) => v
) {
  for (const value of iterator) {
    const list = collectionSelector(value);

    for (const element of list) yield resultSelector(value, element);
  }
}
