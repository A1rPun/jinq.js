export function elementAt(source, atIndex) {
  let index = 0;

  for (const element of source)
    if (atIndex === index) return element;
    else index++;
}

export function elementAtOrDefault(source, atIndex, defaultValue) {
  return elementAt(source, atIndex) ?? defaultValue;
}
