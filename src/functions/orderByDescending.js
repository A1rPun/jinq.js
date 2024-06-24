export function* orderByDescending(
  source,
  keySelector = (v) => v
) {
  yield* [...source].sort((a, b) => {
    const aValue = keySelector(a);
    const bValue = keySelector(b);
    return aValue < bValue ? 1 : bValue < aValue ? -1 : 0;
  });
}
