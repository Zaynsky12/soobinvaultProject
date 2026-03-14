import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@aptos-labs/wallet-adapter-react",
    "@aptos-labs/wallet-adapter-core",
    "@aptos-labs/wallet-standard",
    "@aptos-labs/aptos-client",
    "@shelby-protocol/react",
    "@wallet-standard/core",
    "@wallet-standard/base"
  ],
  serverExternalPackages: [
    "@aptos-labs/ts-sdk",
    "@shelby-protocol/sdk",
    "got"
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // @ts-ignore
  turbopack: {}
};

export default nextConfig;
