import { asEnumerable } from './asEnumerable.js';

export function sequenceEqual(source, list, comparer = (a, b) => a === b) {
  const sourceList = asEnumerable(source);
  const checkList = asEnumerable(list);

  let sourceNext = sourceList.next();
  let checkNext = checkList.next();

  while (!sourceNext.done || !checkNext.done) {
    if (!comparer(sourceNext.value, checkNext.value)) return false;

    sourceNext = sourceList.next();
    checkNext = checkList.next();
  }
  return true;
}
