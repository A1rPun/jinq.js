import toLookup from './toLookup.js';

export default function groupBy(
  generator,
  groupBy = (v) => v,
  select = (v) => v
) {
  const groups = toLookup(generator, groupBy, select);

  return Object.entries(groups).map(([key, value]) => ({ key, value }));
}
