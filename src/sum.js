import { aggregate } from './aggregate.js';

export function sum(source, selector) {
  return aggregate(source, 0, (a, b) => a + b, selector);
}
