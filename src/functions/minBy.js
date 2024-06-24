import { min } from './min.js';
import { select } from './select.js';

export function minBy(source, selector) {
  return min(select(source, selector));
}
