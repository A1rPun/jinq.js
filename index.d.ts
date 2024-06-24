declare class Enumerable<TSource> {
  aggregate<TAccumulate, TResult>(
    seed: TAccumulate,
    accumulator: (result: TAccumulate, element: TSource, index: number) => TAccumulate,
    resultSelector?: (element: TSource) => TResult
  ): TResult;
  all(predicate?: (element: TSource) => boolean): boolean;
  any(predicate?: (element: TSource) => boolean): boolean;
  append(...elements: TSource[]): Enumerable<TSource>;
  asEnumerable(): Enumerable<TSource>;
  average(selector: (element: TSource) => number): number;
  cast<TResult>(selector: (element: TSource) => TResult): Enumerable<TResult>;
  chunk(size: number): Enumerable<TSource>;
  concat(second: Iterable<TSource>): Enumerable<TSource>;
  contains(element: TSource): boolean;
  count(predicate?: (element: TSource) => boolean): number;
  defaultIfEmpty(defaultValue: TSource): Enumerable<TSource>;
  distinct(): Enumerable<TSource>;
  distinctBy(keySelector?: (element: TSource) => string): Enumerable<TSource>;
  elementAt(atIndex: number): TSource;
  elementAtOrDefault(atIndex: number): TSource | undefined;
  static empty<TResult>(): Enumerable<TResult>;
  except(second: Iterable<TSource>): Enumerable<TSource>;
  exceptBy(second: Iterable<TSource>, keySelector?: (element: TSource) => string): Enumerable<TSource>;
  first(predicate?: (element: TSource) => boolean): TSource;
  firstOrDefault(predicate?: (element: TSource) => boolean, defaultValue?: TSource): TSource | undefined;
  static from<TResult>(iterator: Iterable<TResult>): Enumerable<TResult>;
  groupBy<TElement, TResult>(
    keySelector?: (element: TSource) => string,
    elementSelector?: (element: TSource) => TElement,
    resultSelector?: (element: TElement) => TResult
  ): Enumerable<TResult>;
  groupJoin<TInner, TResult>(
    inner: Iterable<TSource>,
    outerKeySelector: (element: TSource) => string,
    innerKeySelector: (element: TInner) => string,
    resultSelector?: (element: TSource) => TResult
  ): Enumerable<TResult>;
  intersect(second: Iterable<TSource>): Enumerable<TSource>;
  intersectBy(second: Iterable<TSource>, keySelector?: (element: TSource) => string): Enumerable<TSource>;
  join<TInner, TResult>(
    inner: Iterable<TSource>,
    outerKeySelector: (element: TSource) => string,
    innerKeySelector: (element: TInner) => string,
    resultSelector?: (element: TSource) => TResult
  ): Enumerable<TResult>;
  last(predicate?: (element: TSource) => boolean): TSource;
  lastOrDefault(predicate?: (element: TSource) => boolean, defaultValue?: TSource): TSource | undefined;
  longCount(predicate?: (element: TSource) => boolean): BigInt;
  max(): number;
  maxBy(selector: (element: TSource) => number): number;
  min(): number;
  minBy(selector: (element: TSource) => number): number;
  ofType(type: string): Enumerable<TSource>;
  order(): Enumerable<TSource>;
  orderBy(keySelector?: (element: TSource) => string): Enumerable<TSource>;
  orderByDescending(keySelector?: (element: TSource) => string): Enumerable<TSource>;
  prepend(...elements: TSource[]): Enumerable<TSource>;
  static range(start: number, count: number): Enumerable<number>;
  static repeat<TResult>(element: TResult, count: number): Enumerable<TResult>;
  reverse(): Enumerable<TSource>;
  select<TResult>(selector: (element: TSource) => TResult): Enumerable<TResult>;
  selectMany<TCollection, TResult>(
    collectionSelector: (element: TSource) => Iterable<TCollection>,
    resultSelector?: (element: TSource, collection: TCollection) => TResult
  ): Enumerable<TResult>;
  sequenceEqual(second: Iterable<TSource>): boolean;
  single(predicate?: (element: TSource) => boolean): TSource;
  singleOrDefault(predicate?: (element: TSource) => boolean, defaultValue?: TSource): TSource | undefined;
  skip(skip: number): Enumerable<TSource>;
  skipLast(count: number): Enumerable<TSource>;
  skipWhile(predicate?: (element: TSource) => boolean): Enumerable<TSource>;
  sum<TResult>(resultSelector?: (element: TSource) => TResult): TResult | number;
  take(take: number): Enumerable<TSource>;
  takeLast(count: number): Enumerable<TSource>;
  takeWhile(predicate?: (element: TSource) => boolean): Enumerable<TSource>;
  toArray(): Array<TSource>;
  toDictionary<TResult>(
    keySelector?: (element: TSource) => string,
    elementSelector?: (element: TSource) => TResult
  ): Map<string, TResult>;
  toHashSet(): Set<TSource>;
  toList(): Array<TSource>;
  toLookup<TResult>(
    keySelector?: (element: TSource) => string,
    elementSelector?: (element: TSource) => TResult
  ): Map<string, TResult>;
  tryGetNonEnumeratedCount(): number | undefined;
  union(second: Iterable<TSource>): Enumerable<TSource>;
  unionBy(
    second: Iterable<TSource>,
    keySelector?: (element: TSource) => string
  ): Enumerable<TSource>;
  where(predicate?: (element: TSource) => boolean): Enumerable<TSource>;
  zip<TSecond, TResult>(second: Iterable<TSecond>, zipFn?: (a: TSource, b: TSecond) => TResult): Enumerable<TResult>;
}

export { Enumerable as jinq };
