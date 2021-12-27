export default function distinct(generator) {
  return [...new Set(generator)];
}
