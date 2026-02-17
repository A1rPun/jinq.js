import * as functions from './src/index.js';
import { Enumerable } from './src/Enumerable.js';

for (const [name, fn] of Object.entries(functions)) {
  if (Enumerable.prototype[name]) continue;

  const isGenerator = fn.constructor.name === 'GeneratorFunction';

  if (isGenerator) {
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
