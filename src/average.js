import { sum } from './sum.js';

export function average(generator, selectN = (v) => v) {
  const list = [...generator];
  return list.length ? sum(list, selectN) / list.length : undefined;
}
