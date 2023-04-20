export function* selectMany(
  iterator,
  collectionSelector = (v) => v,
  resultSelector = (_, v) => v
) {
  let index = 0;
  for (const value of iterator) {
    const list = collectionSelector(value, index);
    index++;

    for (const element of list) yield resultSelector(value, element);
  }
}
