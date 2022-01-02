import toDictionary from './toDictionary.js';
import toLookup from './toLookup.js';

export default function* groupJoin(
  generator,
  list,
  outerKey,
  innerKey,
  select = (a, b) => ({ ...a, ...b })
) {
  const genLookup = toDictionary(generator, outerKey);
  const listLookup = toLookup(list, innerKey);

  for (const outer in genLookup)
    if (listLookup[outer]) yield select(genLookup[outer], listLookup[outer]);
}
