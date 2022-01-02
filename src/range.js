export function* range(start, count) {
  for (let value = start; value <= count; value++) yield value;
}
