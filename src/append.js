export default function* append(generator, ...elements) {
  for (const value of generator) yield value;
  for (const value of elements) yield value;
}
