import { InvalidOperationException } from './errors.js';

function getSingle(source, predicate = () => true) {
  let single = undefined;

  for (const element of source)
    if (predicate(element))
      if (single !== undefined) throw new InvalidOperationException("More than one element satisfies the condition in predicate.");
      else single = element;

  return single;
}

export function single(source, predicate) {
  const single = getSingle(source, predicate);

  if (single === undefined) throw new InvalidOperationException("The source sequence is empty.")
  return single;
}

export function singleOrDefault(source, predicate, defaultValue) {
  return getSingle(source, predicate) ?? defaultValue;
}
