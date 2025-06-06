import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'rb.gy/**',
    }, {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com/**',
    },
    {
      protocol: "https",
      hostname: "res.cloudinary.com"
    }, {
      protocol: "https",
      hostname: "pbs.twimg.com/**"
    },
  ]
  }
};

export default nextConfig;
