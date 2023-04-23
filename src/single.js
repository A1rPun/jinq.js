function getSingle(source, predicate = () => true, defaultValue) {
  let single = undefined;

  for (const element of source)
    if (predicate(element))
      if (single !== undefined) throw Error("More than one element satisfies the condition in predicate.");
      else single = element;

  return single;
}

export function single(source, predicate) {
  const single = getSingle(source, predicate);

  if (single === undefined) throw Error("The source sequence is empty.")
  return single;
}

export function singleOrDefault(source, predicate, defaultValue) {
  return getSingle(source, predicate) ?? defaultValue;
}
