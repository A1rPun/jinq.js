import * as functions from './src/index.js';
import { Enumerable } from './src/Enumerable.js';

const valueFunctions = [
  'aggregate',
  'all',
  'any',
  'average',
  'contains',
  'count',
  'elementAt',
  'elementAtOrDefault',
  'first',
  'firstOrDefault',
  'last',
  'lastOrDefault',
  'longCount',
  'max',
  'maxBy',
  'min',
  'minBy',
  'sequenceEqual',
  'single',
  'singleOrDefault',
  'sum',
  'toArray',
  'toDictionary',
  'toHashSet',
  'toList',
  'toLookup',
];

for (const name of valueFunctions) {
  Enumerable.prototype[name] = function (...args) {
    return functions[name](this.sequence, ...args);
  };
}

for (const [name, fn] of Object.entries(functions)) {
  if (!Enumerable[name] && !Enumerable.prototype[name])
    Enumerable.prototype[name] = function (...args) {
      return new Enumerable(fn(this.sequence, ...args));
    };
}

export { Enumerable as jinq };
