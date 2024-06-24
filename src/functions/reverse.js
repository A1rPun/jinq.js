export function* reverse(source) {
  const list = [...source];
  for (let i = list.length; i--;) yield list[i];
}
