export default function contains(generator, contain) {
  for (const value of generator)
    if (value === contain) return true;
  return false;
}
