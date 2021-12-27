export default function any(generator, predicate = () => true) {
  for (const value of generator)
    if (predicate(value)) return value !== undefined;
  return false;
}
