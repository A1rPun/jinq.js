import { min } from './min.js';
import { select } from './select.js';

export function minBy(iterator, selector) {
  return min(select(iterator, selector));
}
