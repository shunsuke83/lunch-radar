// Branch words vary between our names and map listings
// ("국미당 양재역" vs "국미당 양재역점" vs "국미당").
const BRANCH = /(양재역|양재|강남|서초구청|뱅뱅사거리|본점|역점|직영점|점)$/;

function core(name: string): string {
  let n = name
    .toLowerCase()
    .replace(/\(.*?\)|\[.*?\]/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "");
  for (let i = 0; i < 3; i++) {
    const next = n.replace(BRANCH, "");
    if (next === n || next.length < 2) break;
    n = next;
  }
  return n;
}

/** True when a map listing name plausibly is the same restaurant. */
export function matchesPlaceName(ours: string, theirs: string): boolean {
  const a = core(ours);
  const b = core(theirs);
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}
