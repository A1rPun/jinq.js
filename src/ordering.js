const ordering = Symbol('EnumerableOrdering');

export function* createOrderedIterator(
  source,
  keySelector = x => x.key,
  comparer = defaultComparer,
  ascending = true
) {
  yield ordering;
  yield [keySelector, comparer, ascending];
  yield* source;
}

export function* checkOrdering(iterator) {
  const options = [];
  const results = [];

  for (const next of iterator)
    if (next === ordering)
      options.unshift(iterator.next().value);
    else results.push(next);

  yield* results.sort(doSort(options));
}

function defaultComparer(a, b) {
  return a < b ? -1 : b < a ? 1 : 0; 
}

function compare(a, b, keySelector, comparer, ascending) {
  const aValue = keySelector(a);
  const bValue = keySelector(b);

  return ascending
    ? comparer(aValue, bValue)
    : -comparer(aValue, bValue);
}

function doSort(options) {
  return (a, b) => {
    for (const option of options) {
      const result = compare(a, b, ...option);
      if (result) return result;
    }
    return 0;
  };
}
