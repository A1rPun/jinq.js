export function* range(start, count) {
  for (let value = start, end = start + count; value < end; value++) yield value;
}
