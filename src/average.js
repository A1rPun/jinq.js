import { sum } from './sum.js';

export function average(iterator, selectN = (v) => v) {
  const list = [...iterator];
  return list.length ? sum(list, selectN) / list.length : undefined;
}
