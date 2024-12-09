import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    distDir: 'out',
    sassOptions: {
        additionalData: `@import "./src/app/styles/variables.scss";`,
    },
    experimental: {
        turbo: {
            useSwcCss: true,
        },
    },
    images: {
        domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
    },
};

export default nextConfig;
