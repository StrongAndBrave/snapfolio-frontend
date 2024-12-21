import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    distDir: 'out',
    sassOptions: {
        additionalData: `@import "./src/app/styles/variables.scss";`,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    experimental: {
        turbo: {
            useSwcCss: true,
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    images: {
        domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
    },
};

export default nextConfig;
