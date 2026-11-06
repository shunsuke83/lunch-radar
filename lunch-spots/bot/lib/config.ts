export const CHANNEL_ID_ENV = "LUNCH_SPOTS_CHANNEL_ID";

/** Slack channel the agent collects from. Empty when not configured. */
export function lunchChannelId(): string {
  return process.env[CHANNEL_ID_ENV]?.trim() ?? "";
}

export const MISSING_CHANNEL_MESSAGE = `Set ${CHANNEL_ID_ENV} (the lunch Slack channel id) in .env.local or the environment.`;
