import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = '/formular-atomos';

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath: isProd && isGitHubActions ? repoName : '',
  assetPrefix: isProd && isGitHubActions ? `${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@formular/atomos', '@atomos/ui', 'formular.dev'],
};

export default nextConfig;
