import * as functions from './src/index.js';
import { Enumerable } from './src/Enumerable.js';

const staticFunctions = [
  'empty',
  'infiniteSequence',
  'iterate',
  'range',
  'repeat',
  'sequence',
];

for (const [name, fn] of Object.entries(functions)) {
  if (staticFunctions.includes(name)) {
    Enumerable[name] = function (...args) {
      return new Enumerable(fn(...args));
    };
  } else if (fn.constructor.name === 'GeneratorFunction') {
    Enumerable.prototype[name] = function (...args) {
      return new Enumerable(fn(this.sequence, ...args));
    };
  } else {
    Enumerable.prototype[name] = function (...args) {
      return fn(this.sequence, ...args);
    };
  }
}

export { Enumerable as jinq };
