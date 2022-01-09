export function* selectMany(generator, many = (v) => v, select = (_, v) => v) {
  for (const value of generator) {
    const list = many(value);

    for (const element of list) yield select(value, element);
  }
}
