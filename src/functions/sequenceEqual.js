import { asEnumerable } from './asEnumerable.js';

export function sequenceEqual(source, list) {
  const sourceList = asEnumerable(source);
  const checkList = asEnumerable(list);

  let sourceNext = sourceList.next();
  let checkNext = checkList.next();

  while (!sourceNext.done || !checkNext.done) {
    if (sourceNext.value !== checkNext.value) return false;

    sourceNext = sourceList.next();
    checkNext = checkList.next();
  }
  return true;
}
