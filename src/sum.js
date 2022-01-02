import { aggregate } from './aggregate.js';

export function sum(generator, selectN = (v) => v) {
  return aggregate(generator, (a, b) => a + b, 0, selectN);
}
