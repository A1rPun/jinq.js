import { asEnumerable } from './asEnumerable.js';

export function* zip(first, second, zipFn = (a, b) => [a, b]) {
  const sourceList = asEnumerable(first);
  const checkList = asEnumerable(second);

  let sourceNext = sourceList.next();
  let checkNext = checkList.next();

  while (!sourceNext.done || !checkNext.done) {
    yield zipFn(sourceNext.value, checkNext.value);
    sourceNext = sourceList.next();
    checkNext = checkList.next();
  }
}
