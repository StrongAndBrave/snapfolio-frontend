import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    sassOptions: {
        additionalData: `@import "./src/app/styles/variables.scss";`,
    },
};

export default nextConfig;
