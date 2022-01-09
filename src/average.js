import { sum } from './sum.js';

export function average(iterator, selector) {
  const list = [...iterator];

  return list.length ? sum(list, selector) / list.length : undefined;
}
