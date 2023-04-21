declare class Enumerable {
	constructor(iterator: Iterable<any>);
  aggregate(seed: any, accumulator: () => any, resultSelector: () => any): any;
  all(predicate: () => boolean): boolean;
  any(predicate: () => boolean): boolean;
  append(...elements: any): Enumerable;
  asEnumerable(): Enumerable;
  average(selector: () => number): any;
  chunk(size: number): Enumerable;
  concat(list: Iterable<any>): Enumerable;
  contains(element: any, comparer: () => any): boolean;
  count(predicate: () => boolean): number;
  defaultIfEmpty(defaultValue: any): Enumerable;
  distinct(): Enumerable;
  distinctBy(keySelector: () => string): Enumerable;
  elementAt(atIndex: number): any;
  elementAtOrDefault(atIndex: number): any;
  static empty(): Enumerable;
  except(list: Iterable<any>): Enumerable;
  exceptBy(list: Iterable<any>, keySelector: () => string): Enumerable;
  first(predicate: () => boolean): any;
  firstOrDefault(predicate: () => boolean, defaultValue: any): any;
  static from<T>(iterator: Iterable<T>): Enumerable;
  groupBy(keySelector: () => string, elementSelector: () => any, resultSelector: () => any): Enumerable;
  groupJoin(list: Iterable<any>, outerKeySelector: () => string, innerKeySelector: () => string, resultSelector: () => any): Enumerable;
  intersect(list: Iterable<any>): Enumerable;
  intersectBy(list: Iterable<any>, keySelector: () => string): Enumerable;
  join(list: Iterable<any>, outerKeySelector: () => string, innerKeySelector: () => string, resultSelector: () => any): Enumerable;
  last(predicate: () => boolean): any;
  lastOrDefault(predicate: () => boolean, defaultValue: any): any;
  longCount(predicate: () => boolean): BigInt;
  max(): number;
  maxBy(selector: () => number): number;
  min(): number;
  minBy(selector: () => number): number;
  ofType(type: string): Enumerable;
  orderBy(keySelector: () => string): Enumerable;
  orderByDescending(keySelector: () => string): Enumerable;
  prepend(...elements: any): Enumerable;
  static range(start: number, count: number): Enumerable;
  static repeat(start: number, count: number): Enumerable;
  reverse(): Enumerable;
  select(selector: () => any): Enumerable;
  selectMany(collectionSelector: () => any, resultSelector: () => any): Enumerable;
  sequenceEqual(list: Iterable<any>, comparer: () => any): boolean;
  single(predicate: () => boolean): any;
  singleOrDefault(predicate: () => boolean, defaultValue: any): any;
  skip(skip: number): Enumerable;
  skipLast(count: number): Enumerable;
  skipWhile(predicate: () => boolean): Enumerable;
  sum(selector: () => number): number;
  take(take: number): Enumerable;
  takeLast(count: number): Enumerable;
  takeWhile(predicate: () => boolean): Enumerable;
  toArray(): Array<any>;
  toDictionary(keySelector: () => string, elementSelector: () => any): Map<string, any>;
  toHashSet(): Set<any>;
  toList(): Array<any>;
  toLookup(keySelector: () => string, elementSelector: () => any): Map<string, any>;
  tryGetNonEnumeratedCount(): number | undefined;
  union(list: Iterable<any>, comparer: () => any): Enumerable;
  unionBy(list: Iterable<any>, keySelector: () => string, comparer: () => any): Enumerable;
  where(predicate: () => boolean): Enumerable;
  zip(list: Iterable<any>, zipFn: () => any): Enumerable;
}

export { Enumerable as jinq };
