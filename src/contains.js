export function contains(source, value) {
  for (const element of source) if (value === element) return true;
  return false;
}
