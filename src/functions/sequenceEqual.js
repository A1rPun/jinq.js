import { asEnumerable } from './asEnumerable.js';
import { equalityComparer } from './equalityComparer.js';

export function sequenceEqual(first, second, comparer = equalityComparer) {
  const sourceList = asEnumerable(first);
  const checkList = asEnumerable(second);

  let sourceNext = sourceList.next();
  let checkNext = checkList.next();

  while (!sourceNext.done || !checkNext.done) {
    if (!comparer(sourceNext.value, checkNext.value)) return false;

    sourceNext = sourceList.next();
    checkNext = checkList.next();
  }
  return true;
}
