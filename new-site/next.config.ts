import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export: srcset points at pre-built photo widths (lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 1024, 1600],
    imageSizes: [],
  },
};

export default nextConfig;
