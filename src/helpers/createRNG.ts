/**
 * Creates a random number generator.
 * It ensures that the same numbers are not repeated several times in a row.
 */
export function createRNG(min = 0, max = 10) {
  const list = new Array(1 + max - min).fill(1).map((_, index) => index + min);
  const rest = [...list];
  return () => {
    if (rest.length < 1) {
      rest.push(...list);
    }
    const index = Math.floor(Math.random() * rest.length);
    return rest.splice(index, 1)[0] as number;
  };
}
