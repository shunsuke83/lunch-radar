import { readFileSync } from "node:fs";
import path from "node:path";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// Class names follow @genonai/admin-design-system (text-text-primary,
// gap-stack-md, h-size-control-md, rounded-xs, typography-label-md-regular, …),
// all backed by the --token-* variables in src/app/ds-tokens.css.
const tokenNames = [
  ...readFileSync(path.join(__dirname, "src/app/ds-tokens.css"), "utf8").matchAll(
    /--token-([a-z0-9-]+):/g,
  ),
].map((m) => m[1]);

function pick(prefix: RegExp, key: (name: string) => string) {
  const out: Record<string, string> = {};
  for (const name of tokenNames) {
    const m = name.match(prefix);
    if (m) out[key(m[1])] = `var(--token-${name})`;
  }
  return out;
}

const colors = pick(/^color-(.+)$/, (k) => k);
const spacing = {
  ...pick(/^spacing-((?:inline|stack|group)-.+)$/, (k) => k),
  ...pick(/^size-((?:icon|control)-.+)$/, (k) => `size-${k}`),
};
const borderRadius = pick(/^radius-(.+)$/, (k) => k);
const boxShadow = Object.fromEntries(
  [
    ...new Set(
      tokenNames.flatMap((n) => n.match(/^shadow-((?:default|brand)-[a-z]+)-color$/)?.[1] ?? []),
    ),
  ].map((k) => [
    k,
    `var(--token-shadow-${k}-offset-x) var(--token-shadow-${k}-offset-y) var(--token-shadow-${k}-blur) var(--token-shadow-${k}-color)`,
  ]),
);
const typography = Object.fromEntries(
  [
    ...new Set(tokenNames.flatMap((n) => n.match(/^typography-(.+)-size$/)?.[1] ?? [])),
  ].map((k) => [
    `.typography-${k}`,
    {
      fontSize: `var(--token-typography-${k}-size)`,
      lineHeight: `var(--token-typography-${k}-line-height)`,
      fontWeight: `var(--token-typography-${k}-weight)`,
      letterSpacing: `var(--token-typography-${k}-letter-spacing)`,
    },
  ]),
);

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius,
      boxShadow,
      maxWidth: { content: "var(--token-layout-max-width-content)" },
      fontFamily: {
        sans: ["Pretendard Variable", "var(--token-font-family-ko)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [plugin(({ addUtilities }) => addUtilities(typography))],
} satisfies Config;
