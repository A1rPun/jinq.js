export default function last(generator, predicate = () => true) {
  let last = undefined;
  for (const value of generator) if (predicate(value)) last = value;
  return last;
}
