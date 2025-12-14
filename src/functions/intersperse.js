import { asEnumerable } from './asEnumerable.js';

export function* intersperse(source, value) {
  const genList = asEnumerable(source);
  let genNext = genList.next();

  while (!genNext.done) {
    yield genNext.value;
    genNext = genList.next();
    if (!genNext.done) yield value;
  }
}
