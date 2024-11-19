import type { Metadata } from 'next';
import '@/app/styles/styles.scss';
import { interSans } from '@/shared/assets/fonts';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang="en">
            <body className={`${interSans.variable}`}>{children}</body>
        </html>
    );
};