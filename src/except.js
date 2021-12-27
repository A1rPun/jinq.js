import toDictionary from './toDictionary.js';

export default function except(generator, list, groupBy = (v) => v) {
  var lookup = toDictionary(generator, groupBy);
  var lookup2 = toDictionary(list, groupBy);
  var result = [];
  for (var prop in lookup) {
    if (lookup2[prop] === undefined) result.push(lookup[prop]);
  }
  return result;
}
