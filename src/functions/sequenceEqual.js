import { asEnumerable } from './asEnumerable.js';

export function sequenceEqual(first, second) {
  const sourceList = asEnumerable(first);
  const checkList = asEnumerable(second);

  let sourceNext = sourceList.next();
  let checkNext = checkList.next();

  while (!sourceNext.done || !checkNext.done) {
    if (sourceNext.value !== checkNext.value) return false;

    sourceNext = sourceList.next();
    checkNext = checkList.next();
  }
  return true;
}
