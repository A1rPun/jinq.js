export function* repeat(element, count) {
  for (let i = 0; i < count; i++) yield element;
}
