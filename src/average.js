export function average(generator, select = (v) => v) {
  let sum = 0;
  let i = 0;

  for (const value of generator) {
    sum += select(value);
    i++;
  }

  if (!i) throw RangeError('Sequence contains no elements');

  return sum / i;
}
