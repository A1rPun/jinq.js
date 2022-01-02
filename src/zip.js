import { asEnumerable } from './asEnumerable.js';

export function* zip(generator, list, zipFn = (a, b) => [a, b]) {
  const genList = asEnumerable(generator);
  const checkList = asEnumerable(list);

  let genNext = genList.next();
  let checkNext = checkList.next();

  while (!genNext.done || !checkNext.done) {
    yield zipFn(genNext.value, checkNext.value);
    genNext = genList.next();
    checkNext = checkList.next();
  }
}
