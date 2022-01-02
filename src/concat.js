export default function* concat(generator, list) {
  for (const value of generator) yield value;
  for (const value of list) yield value;
}
