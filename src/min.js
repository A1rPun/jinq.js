import { select } from './select.js';

export function min(generator, selectN = (v) => v) {
  return Math.min(...select(generator, selectN));
}
