import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 에러 무시
  },
  // 필요하면 타입스크립트 에러도 무시
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
