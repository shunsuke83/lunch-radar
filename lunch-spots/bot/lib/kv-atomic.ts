import { supportsKvCas, type HostKvApi, type JsonValue } from "@grok/agent-sdk";

const MAX_CAS_ATTEMPTS = 8;

// Tools receive a plain HostKvApi (no CAS) from the framework, so concurrent
// read-modify-write on one key is serialized per process with a promise chain.
// A CAS-capable store is used directly when present.
const keyLocks = new Map<string, Promise<unknown>>();

function withKeyLock<T>(key: string, task: () => Promise<T>): Promise<T> {
  const prev = keyLocks.get(key) ?? Promise.resolve();
  const run = prev.then(task, task);
  const tail = run.then(
    () => undefined,
    () => undefined,
  );
  keyLocks.set(key, tail);
  void tail.then(() => {
    if (keyLocks.get(key) === tail) keyLocks.delete(key);
  });
  return run;
}

/** Read-modify-write one key without losing concurrent updates. */
export async function updateKey<T>(
  kv: HostKvApi,
  key: string,
  update: (prior: T | undefined) => T,
): Promise<T> {
  if (!supportsKvCas(kv)) {
    return withKeyLock(key, async () => {
      const next = update((await kv.get(key)) as T | undefined);
      await kv.put(key, next as JsonValue);
      return next;
    });
  }

  for (let attempt = 0; attempt < MAX_CAS_ATTEMPTS; attempt++) {
    const current = await kv.getWithVersion(key);
    const next = update(current?.value as T | undefined);
    const result = current
      ? await kv.putIfVersion(key, next as JsonValue, current.version)
      : await kv.putIfAbsent(key, next as JsonValue);
    if (result.ok) return next;
  }
  throw new Error(`kv update for ${key} kept conflicting`);
}
