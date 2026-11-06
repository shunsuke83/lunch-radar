import type { HostKvApi } from "@grok/agent-sdk";
import type { Restaurant } from "./restaurants.js";

type SlackClient = {
  auth: { test: () => Promise<{ ok?: boolean; url?: string }> };
  users: {
    info: (args: { user: string }) => Promise<{
      ok?: boolean;
      user?: {
        name?: string;
        real_name?: string;
        profile?: { display_name?: string; real_name?: string };
      };
    }>;
  };
};

type Host = { kv: HostKvApi; slack: { getClient: () => Promise<unknown> } };

const WORKSPACE_KEY = "slack:workspace-url";
const userKey = (id: string) => `slack:user-name:${id}`;
const NAME_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MISS_TTL_MS = 24 * 60 * 60 * 1000;

async function client(host: Host): Promise<SlackClient | null> {
  try {
    return (await host.slack.getClient()) as SlackClient;
  } catch {
    return null;
  }
}

/** https://<workspace>.slack.com/ from auth.test, cached. */
async function workspaceUrl(host: Host): Promise<string | null> {
  const cached = (await host.kv.get(WORKSPACE_KEY)) as string | undefined;
  if (cached) return cached;
  const slack = await client(host);
  const url = slack ? (await slack.auth.test().catch(() => null))?.url : undefined;
  if (!url) return null;
  const base = url.endsWith("/") ? url : `${url}/`;
  await host.kv.put(WORKSPACE_KEY, base);
  return base;
}

/** Display name for a Slack user id (users.info), cached for a week. */
async function userName(host: Host, userId: string): Promise<string | null> {
  const key = userKey(userId);
  const cached = (await host.kv.get(key)) as { name: string | null; exp: number } | undefined;
  if (cached && cached.exp > Date.now()) return cached.name;
  if (cached) await host.kv.delete(key);
  const slack = await client(host);
  if (!slack) return null;
  const res = await slack.users.info({ user: userId }).catch(() => null);
  const u = res?.ok ? res.user : undefined;
  const name =
    u?.profile?.display_name?.trim() ||
    u?.profile?.real_name?.trim() ||
    u?.real_name?.trim() ||
    u?.name ||
    null;
  // Misses are cached briefly so an unknown id does not hit users.info on every list.
  await host.kv.put(key, { name, exp: Date.now() + (name ? NAME_TTL_MS : MISS_TTL_MS) });
  return name;
}

export function messagePermalink(base: string, channelId: string, ts: string): string {
  return `${base}archives/${channelId}/p${ts.replace(".", "")}`;
}

export type PresentedRestaurant = Omit<Restaurant, "source" | "countedMessages"> & {
  sourceLink?: string;
  recommendedBy?: string;
};

/**
 * Restaurant for a chat reply: original message link and author name instead
 * of raw Slack ids. Only for the bot; the public catalog never carries these.
 */
export async function presentRestaurants(
  host: Host,
  rows: Restaurant[],
): Promise<PresentedRestaurant[]> {
  const needsSlack = rows.some((r) => r.source?.messageTs || r.source?.author);
  const base = needsSlack ? await workspaceUrl(host) : null;
  const names = new Map<string, string | null>();
  const out: PresentedRestaurant[] = [];
  for (const { source, countedMessages: _counted, ...rest } of rows) {
    const row: PresentedRestaurant = { ...rest };
    if (source?.permalink) {
      row.sourceLink = source.permalink;
    } else if (base && source?.channelId && source.messageTs) {
      row.sourceLink = messagePermalink(base, source.channelId, source.messageTs);
    }
    const author = source?.author;
    if (author && /^[UW][A-Z0-9]+$/.test(author)) {
      if (!names.has(author)) names.set(author, await userName(host, author));
      const name = names.get(author);
      if (name) row.recommendedBy = name;
    } else if (author) {
      row.recommendedBy = author;
    }
    out.push(row);
  }
  return out;
}
