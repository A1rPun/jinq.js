import { ArgumentOutOfRangeException } from './errors.js';

export function elementAt(source, atIndex) {
  if (atIndex < 0) throw new ArgumentOutOfRangeException();
  let index = 0;

  for (const element of source)
    if (atIndex === index) return element;
    else index++;

  throw new ArgumentOutOfRangeException();
}

export function elementAtOrDefault(source, atIndex, defaultValue) {
  try {
    return elementAt(source, atIndex);
  } catch (_) {
    return defaultValue;
  }
}
