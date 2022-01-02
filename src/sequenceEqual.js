import { asEnumerable } from './asEnumerable.js';

export function sequenceEqual(generator, list) {
  const genList = asEnumerable(generator);
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
