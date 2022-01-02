export default function contains(generator, element) {
  for (const value of generator)
    if (value === element) return true;
  return false;
}
