export function elementAt(generator, atIndex) {
  let index = 0;

  for (const value of generator)
    if (atIndex === index) return value;
    else index++;
}
