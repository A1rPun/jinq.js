import { sum } from './sum.js';

export function average(iterator, selector = (v) => v) {
  const list = [...iterator];

  return list.length ? sum(list, selector) / list.length : undefined;
}
