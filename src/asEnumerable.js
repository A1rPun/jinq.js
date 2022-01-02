export default function* asEnumerable(generator) {
  for (const value of generator) yield value;
}
