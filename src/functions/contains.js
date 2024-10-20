import { equalityComparer } from './equalityComparer.js';

export function contains(source, value, comparer = equalityComparer) {
  for (const element of source) if (comparer(element, value)) return true;
  return false;
}
