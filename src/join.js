export default function join(generator) {
  throw Error('Not implemented');
}

// join: function (list, sourceCallback, joinCallback, selectCallback) {
//   if (!list || !selectCallback) return this;
//   var lookup = toLookup(false, this, sourceCallback);
//   var lookup2 = toLookup(false, list, joinCallback);
//   var result = [];
//   for (var prop in lookup)
//     if (ofType(lookup2[prop]) !== UNDEFINED) {
//       var obj;
//       if (selectCallback) obj = selectCallback(lookup[prop], lookup2[prop]);
//       else {
//         obj = {};
//         var p;
//         var l1 = lookup[prop];
//         var l2 = lookup2[prop];
//         for (p in l1) obj[p] = l1[p];
//         for (p in l2) obj[p] = l2[p];
//       }
//       result.push(obj);
//     }
//   return result;
// },
