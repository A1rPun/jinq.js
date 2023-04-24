import { aggregate } from './aggregate.js';

export function sum(source, resultSelector) {
  return aggregate(source, 0, (a, b) => a + b, resultSelector);
}
