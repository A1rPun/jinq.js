import { select } from './select.js';

export function min(iterator, selectN = (v) => v) {
  return Math.min(...select(iterator, selectN));
}
