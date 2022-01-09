import { select } from './select.js';

export function max(iterator, selector = (v) => v) {
  return Math.max(...select(iterator, selector));
}
