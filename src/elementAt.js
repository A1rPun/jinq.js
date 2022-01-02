export function elementAt(generator, index) {
  let i = 0;

  for (const value of generator)
    if (index === i) return value;
    else i++;
}
