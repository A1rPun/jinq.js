import { InvalidOperationException } from './errors.js';

export function last(source, predicate = () => true) {
  let last = undefined;
  let index = 0;
  for (const element of source) {
    index++;
    if (predicate(element)) last = element;
  }
  if (index === 0) throw new InvalidOperationException("The source sequence is empty.")
  if (last === undefined) throw new InvalidOperationException("No element satisfies the condition in predicate.");
  return last;
}

export function lastOrDefault(source, predicate, defaultValue) {
  try {
    return last(source, predicate);
  } catch (_) {
    return defaultValue;
  }
}
