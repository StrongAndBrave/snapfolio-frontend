import localFont from 'next/font/local';

export const interSans = localFont({
    src: [
        { path: './Inter-Regular.woff', weight: '400' },
        { path: './Inter-Regular.woff2', weight: '400' },
        { path: './Inter-Medium.woff', weight: '500' },
        { path: './Inter-Medium.woff2', weight: '500' },
        { path: './Inter-SemiBold.woff', weight: '600' },
        { path: './Inter-SemiBold.woff2', weight: '600' },
        { path: './Inter-Bold.woff', weight: '700' },
        { path: './Inter-Bold.woff2', weight: '700' },
    ],
    variable: '--font-inter',
});
