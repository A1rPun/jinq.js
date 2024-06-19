import { InvalidOperationException } from './errors.js';

export function first(source, predicate = () => true) {
  let index = 0;
  for (const element of source) {
    if (predicate(element)) return element;
    index++;
  }
  if (index === 0) throw new InvalidOperationException("The source sequence is empty.")
  throw new InvalidOperationException("No element satisfies the condition in predicate.");
}

export function firstOrDefault(source, predicate, defaultValue) {
  try {
    return first(source, predicate);
  } catch (_) {
    return defaultValue;
  }
}
