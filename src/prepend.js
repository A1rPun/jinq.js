export default function* prepend(generator, ...elements) {
  for (const value of elements) yield value;
  for (const value of generator) yield value;
}
