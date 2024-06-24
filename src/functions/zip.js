import { asEnumerable } from './asEnumerable.js';

export function* zip(source, list, zipFn = (a, b) => [a, b]) {
  const sourceList = asEnumerable(source);
  const checkList = asEnumerable(list);

  let sourceNext = sourceList.next();
  let checkNext = checkList.next();

  while (!sourceNext.done || !checkNext.done) {
    yield zipFn(sourceNext.value, checkNext.value);
    sourceNext = sourceList.next();
    checkNext = checkList.next();
  }
}
