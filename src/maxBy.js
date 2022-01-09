import { max } from './max.js';
import { select } from './select.js';

export function maxBy(iterator, selector) {
  return max(select(iterator, selector));
}
