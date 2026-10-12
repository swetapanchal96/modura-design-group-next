import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "modura.salexo.co.in",
      pathname: "/uploads/**",
    },
  ],
},
};

export default nextConfig;
