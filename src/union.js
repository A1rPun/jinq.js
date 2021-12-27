import distinct from './distinct.js';

export default function union(generator, list) {
  return distinct([...generator, ...list]);
}
