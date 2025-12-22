import { leftJoin } from './leftJoin.js';

export function* rightJoin(
  outer,
  inner,
  outerKeySelector,
  innerKeySelector,
  resultSelector
) {
  yield* leftJoin(inner, outer, innerKeySelector, outerKeySelector, resultSelector);
}
