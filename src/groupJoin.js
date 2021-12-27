export default function groupJoin(generator, list) {
  throw Error('Not implemented');
}

// groupJoin: function (list, sourceCallback, joinCallback, selectCallback) {
//   if (!list || !selectCallback) return this;
//   var lookup = toLookup(true, this, sourceCallback);
//   var lookup2 = toLookup(true, list, joinCallback);
//   var result = [];
//   for (var prop in lookup) {
//     if (ofType(lookup2[prop]) !== UNDEFINED)
//       result.push(
//         selectCallback
//           ? selectCallback(lookup[prop], lookup2[prop])
//           : lookup[prop].concat(lookup2[prop])
//       );
//   }
//   return result;
// },