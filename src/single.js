export default function single(generator, predicate = () => true) {
  let single = undefined;
  for (const value of generator)
    if (predicate(value))
      if (single) return undefined;
      else single = value;
  return single;
}
