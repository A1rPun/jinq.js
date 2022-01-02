export default function* takeLast(generator, count = 0) {
  throw Error('Not implemented');
  let i = 0;

  for (const value of generator) {
    if (i > count) yield value;
    i++;
  }
}
