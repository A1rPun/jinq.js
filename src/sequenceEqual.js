import { asEnumerable } from './asEnumerable.js';

export function sequenceEqual(iterator, list, comparer = (a, b) => a === b) {
  const iteratorList = asEnumerable(iterator);
  const checkList = asEnumerable(list);

  let iteratorNext = iteratorList.next();
  let checkNext = checkList.next();

  while (!iteratorNext.done || !checkNext.done) {
    if (!comparer(iteratorNext.value, checkNext.value)) return false;

    iteratorNext = iteratorList.next();
    checkNext = checkList.next();
  }

  return true;
}
