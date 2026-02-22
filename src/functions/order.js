export function* order(source) {
  yield* [...source].sort((aValue, bValue) => aValue < bValue ? -1 : bValue < aValue ? 1 : 0);
}

export function* orderDescending(source) {
  yield* [...source].sort((aValue, bValue) => aValue < bValue ? 1 : bValue < aValue ? -1 : 0);
}
