import localFont from 'next/font/local';

export const inter = localFont({
    src: [
        { path: './inter-400.woff', weight: '400' },
        { path: './inter-400.woff2', weight: '400' },
        { path: './inter-500.woff', weight: '500' },
        { path: './inter-500.woff2', weight: '500' },
        { path: './inter-600.woff', weight: '600' },
        { path: './inter-600.woff2', weight: '600' },
        { path: './inter-700.woff', weight: '700' },
        { path: './inter-700.woff2', weight: '700' },
    ],
    variable: '--font-inter',
});
