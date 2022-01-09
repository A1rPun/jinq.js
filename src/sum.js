import { aggregate } from './aggregate.js';

export function sum(iterator, selector = (v) => v) {
  return aggregate(iterator, (a, b) => a + b, 0, selector);
}
