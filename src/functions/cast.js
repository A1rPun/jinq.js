import { select } from './select.js';

export function cast(source, type) {
  return select(source, type);
}
