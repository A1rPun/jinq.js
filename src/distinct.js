export default function* distinct(generator) {
  const lookup = new Set(generator);
  for (const [_, value] of lookup.entries()) yield value;
}
