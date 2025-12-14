import { aggregate } from './aggregate.js';

export function product(source, resultSelector) {
  return aggregate(source, 1, (a, b) => a * b, resultSelector);
}
