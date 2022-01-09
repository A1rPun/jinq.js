import { asEnumerable } from './asEnumerable.js';

export function* zip(iterator, list, zipFn = (a, b) => [a, b]) {
  const iteratorList = asEnumerable(iterator);
  const checkList = asEnumerable(list);

  let iteratorNext = iteratorList.next();
  let checkNext = checkList.next();

  while (!iteratorNext.done || !checkNext.done) {
    yield zipFn(iteratorNext.value, checkNext.value);
    iteratorNext = iteratorList.next();
    checkNext = checkList.next();
  }
}
