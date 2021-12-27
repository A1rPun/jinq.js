export default function orderByDescending(generator) {
  return [...generator].sort((a, b) => (a > b ? -1 : b > a ? 1 : 0));
}
