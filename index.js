import aggregate from './src/aggregate.js';
import all from './src/all.js';
import any from './src/any.js';
import append from './src/append.js';
import asEnumerable from './src/asEnumerable.js';
import average from './src/average.js';
import chunk from './src/chunk.js';
import concat from './src/concat.js';
import contains from './src/contains.js';
import count from './src/count.js';
import defaultIfEmpty from './src/defaultIfEmpty.js';
import distinct from './src/distinct.js';
import elementAt from './src/elementAt.js';
import empty from './src/empty.js';
import except from './src/except.js';
import first from './src/first.js';
import groupBy from './src/groupBy.js';
import groupJoin from './src/groupJoin.js';
import intersect from './src/intersect.js';
import join from './src/join.js';
import last from './src/last.js';
import max from './src/max.js';
import min from './src/min.js';
import ofType from './src/ofType.js';
import orderBy from './src/orderBy.js';
import orderByDescending from './src/orderByDescending.js';
import prepend from './src/prepend.js';
import range from './src/range.js';
import repeat from './src/repeat.js';
import reverse from './src/reverse.js';
import select from './src/select.js';
import selectMany from './src/selectMany.js';
import sequenceEqual from './src/sequenceEqual.js';
import single from './src/single.js';
import skip from './src/skip.js';
import skipLast from './src/skipLast.js';
import skipWhile from './src/skipWhile.js';
import sum from './src/sum.js';
import take from './src/take.js';
import takeLast from './src/takeLast.js';
import takeWhile from './src/takeWhile.js';
import toDictionary from './src/toDictionary.js';
import toList from './src/toList.js';
import toLookup from './src/toLookup.js';
// TryGetNonEnumeratedCount
import union from './src/union.js';
import where from './src/where.js';
import zip from './src/zip.js';

const longCount = count;
const distinctBy = distinct;
const elementAtOrDefault = elementAt;
const exceptBy = except;
const firstOrDefault = first;
const intersectBy = intersect;
const lastOrDefault = last;
const maxBy = max;
const minBy = min;
const thenBy = orderBy;
const thenByDescending = orderByDescending;
const singleOrDefault = single;
const toHashSet = toDictionary;
const toArray = toList;
const unionBy = union;

export {
  aggregate,
  all,
  any,
  append,
  asEnumerable,
  average,
  chunk,
  concat,
  contains,
  count,
  defaultIfEmpty,
  distinct,
  distinctBy,
  elementAt,
  elementAtOrDefault,
  empty,
  except,
  exceptBy,
  first,
  firstOrDefault,
  groupBy,
  groupJoin,
  intersect,
  intersectBy,
  join,
  last,
  lastOrDefault,
  longCount,
  max,
  maxBy,
  min,
  minBy,
  ofType,
  orderBy,
  orderByDescending,
  prepend,
  range,
  repeat,
  reverse,
  select,
  selectMany,
  sequenceEqual,
  single,
  singleOrDefault,
  skip,
  skipLast,
  skipWhile,
  sum,
  take,
  takeLast,
  takeWhile,
  thenBy,
  thenByDescending,
  toArray,
  toDictionary,
  toHashSet,
  toList,
  toLookup,
  union,
  unionBy,
  where,
  zip,
};
