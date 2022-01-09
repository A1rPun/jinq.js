import { asEnumerable } from './asEnumerable.js';

export function sequenceEqual(iterator, list) {
  const genList = asEnumerable(iterator);
  const checkList = asEnumerable(list);

  let genNext = genList.next();
  let checkNext = checkList.next();

  while (!genNext.done || !checkNext.done) {
    if (genNext.value !== checkNext.value) return false;
    genNext = genList.next();
    checkNext = checkList.next();
  }

  return true;
}
