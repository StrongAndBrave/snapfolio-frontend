import type { Metadata } from 'next';
import '@/app/styles/styles.scss';
import { inter } from '@/shared/assets/fonts';

export const metadata: Metadata = {
    title: 'Inctagram',
    description:
        'A photo and video sharing social network where users can share moments of their lives, follow friends and celebrities, and find inspiration and ideas.',
    keywords: ['social', 'media', 'photo', 'video', 'live'],
    authors: ['Абдулина', 'Афошкин', 'Веремеева', 'Зеленко', 'Касперович', 'Момынов', 'Оглобин', 'Темиргалиева'].map(
        name => ({
            name,
        }),
    ),
    creator: 'IT-Incubator interns',
};

export const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang="en">
            <body className={`${inter.variable}`}>{children}</body>
        </html>
    );
};
