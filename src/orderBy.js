export function* orderBy(
  iterator,
  keySelector = (v) => v
) {
  yield* [...iterator].sort((a, b) => {
    const aValue = keySelector(a);
    const bValue = keySelector(b);
    return aValue < bValue ? -1 : bValue < aValue ? 1 : 0;
  });
}
