import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      basePath,
      assetPrefix: basePath || undefined,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
