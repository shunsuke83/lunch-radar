// Placeholder Worker entry so wrangler.toml validates.
// Scope A keeps GitHub Pages; this file is not deployed yet.
export default {
  async fetch() {
    return new Response("lunch-radar D1 stub — use db:* npm scripts", { status: 200 });
  },
};
