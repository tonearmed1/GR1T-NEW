import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Explicitly set the root to this project to silence workspace root warnings
  outputFileTracingRoot: path.join(__dirname),

  // Migrate deprecated images.domains to images.remotePatterns
  images: {
    formats: ["image/avif", "image/webp"],
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

  // Legacy product-page redirects — preserve inbound links + SEO equity from the
  // pre-platform URLs. Added with the G1 platform redesign (June 2026).
  //
  // /G1S, /G1S/specs   → /motorcycles/g1/street
  // /G1X, /G1X/specs   → /motorcycles/g1/scrambler
  //
  // 308 = permanent + method-preserving (modern equivalent of 301).
  async redirects() {
    return [
      { source: "/G1S", destination: "/motorcycles/g1/street", permanent: true },
      { source: "/G1S/:slug*", destination: "/motorcycles/g1/street", permanent: true },
      { source: "/G1X", destination: "/motorcycles/g1/scrambler", permanent: true },
      { source: "/G1X/:slug*", destination: "/motorcycles/g1/scrambler", permanent: true },
    ];
  },
};

export default nextConfig;
