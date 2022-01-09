import { select } from './select.js';

export function min(iterator, selector = (v) => v) {
  return Math.min(...select(iterator, selector));
}
