import type { NextConfig } from "next";
import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      { hostname: "cdn.discordapp.com" }
    ]
  },
};

export default withMDX()(nextConfig);
