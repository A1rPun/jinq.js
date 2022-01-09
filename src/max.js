import { select } from './select.js';

export function max(iterator, selectN = (v) => v) {
  return Math.max(...select(iterator, selectN));
}
