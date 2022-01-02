export function* selectMany(generator, many = (v) => v, select = (_, v) => v) {
  for (const value of generator) {
    const flatten = many(value);

    for (const obj of flatten) yield select(value, obj);
  }
}
