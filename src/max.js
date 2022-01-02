import { select } from './select.js';

export function max(generator, selectN = (v) => v) {
  return Math.max(...select(generator, selectN));
}
