export function elementAt(iterator, atIndex) {
  let index = 0;

  for (const value of iterator)
    if (atIndex === index) return value;
    else index++;
}
