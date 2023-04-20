function getSingle(iterator, predicate = () => true, defaultValue) {
  let single = defaultValue;

  for (const value of iterator)
    if (predicate(value))
      if (single !== undefined) throw Error("More than one element satisfies the condition in predicate.");
      else single = value;

  return single;
}

export function single(iterator, predicate) {
  const single = getSingle(iterator, predicate);

  if (single === undefined) throw Error("The source sequence is empty.")
  return single;
}

export function singleOrDefault(iterator, predicate, defaultValue = null) {
  return getSingle(iterator, predicate, defaultValue);
}
