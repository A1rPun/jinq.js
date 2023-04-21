import { aggregate } from './aggregate.js';

export function sum(iterator, selector) {
  return aggregate(iterator, 0, (a, b) => a + b, selector);
}
