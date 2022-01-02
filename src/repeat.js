export function* repeat(value, count) {
  for (let i = 0; i < count; i++) yield value;
}
