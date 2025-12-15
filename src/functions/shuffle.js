function mulberry32(seed) {
  let state = (seed ?? Date.now()) >>> 0;

  return function () {
    state += 0x6D2B79F5;
    let result = Math.imul(state ^ (state >>> 15), 1 | state);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(source, randomSeed) {
  const random = mulberry32(randomSeed);
  const list = [...source];

  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function random(source, randomSeed) {
  const random = mulberry32(randomSeed);
  const list = [...source];
  const index = Math.floor(random() * list.length);

  return list[index];
}
