export function* selectMany(
  source,
  collectionSelector = (v) => v,
  resultSelector = (_, v) => v
) {
  let index = 0;
  for (const element of source) {
    const list = collectionSelector(element, index);
    index++;

    for (const collection of list) yield resultSelector(element, collection);
  }
}
