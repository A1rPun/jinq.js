import { sum } from './sum.js';

export function average(source, selector) {
  const list = [...source];
  return list.length ? sum(list, selector) / list.length : undefined;
}
