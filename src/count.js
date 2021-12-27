export default function count(generator, predicate = () => true) {
  let count = 0;
  for (const value of generator) if (predicate(value)) count++;
  return count;
}
