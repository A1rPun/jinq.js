export function* distinct(iterator) {
  const lookup = new Set(iterator);
  for (const [_, value] of lookup.entries()) yield value;
}
