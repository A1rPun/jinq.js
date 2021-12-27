export default function toDictionary(
  generator,
  groupBy = (v) => v,
  select = (v) => v
) {
  const dictionary = {};

  for (const value of generator) {
    const key = groupBy(value);
    if (!dictionary[key]) dictionary[key] = select(value);
  }
  return dictionary;
}
