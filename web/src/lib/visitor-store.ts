const KEY = "lunch-radar:visits:v1";

export type VisitMark = "visited" | "dislike";

type Store = Record<string, VisitMark>;

function read(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const data = JSON.parse(raw) as Store;
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function write(store: Store): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* private mode / quota */
  }
}

export function getVisitMarks(): Store {
  return read();
}

export function setVisitMark(slug: string, mark: VisitMark | null): Store {
  const store = read();
  if (!mark) delete store[slug];
  else store[slug] = mark;
  write(store);
  return store;
}

export function recordedSlugSet(store: Store = read()): Set<string> {
  return new Set(Object.keys(store));
}
