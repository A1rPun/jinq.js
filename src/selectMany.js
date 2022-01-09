export function* selectMany(iterator, many = (v) => v, select = (_, v) => v) {
  for (const value of iterator) {
    const list = many(value);

    for (const element of list) yield select(value, element);
  }
}
