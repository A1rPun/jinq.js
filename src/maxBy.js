import { max } from './max.js';
import { select } from './select.js';

export function maxBy(source, selector) {
  return max(select(source, selector));
}
