export default function* ofType(generator, type) {
  for (const value of generator) if (typeof value === type) yield value;
}
