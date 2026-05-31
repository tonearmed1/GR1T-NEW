import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Explicitly set the root to this project to silence workspace root warnings
  outputFileTracingRoot: path.join(__dirname),

  // Migrate deprecated images.domains to images.remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exuberant-confidence-8ac5891ec1.media.strapiapp.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
