import type { NextConfig } from "next";

const isPagesExport = process.env.PAGES_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isPagesExport && {
    output: "export",
    basePath: "/Alien-Coin",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
