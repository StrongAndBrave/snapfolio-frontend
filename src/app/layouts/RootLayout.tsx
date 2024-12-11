import type { Metadata } from 'next';
import '@/app/styles/styles.scss';
import { inter } from '@/shared/assets/fonts';
import { ReduxWrapper } from '@/app/layouts/ReduxWrapper';
import {Header} from "@/widgets";

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
            <head>
                <link rel="icon" href="/favicon-dark.ico" media="(prefers-color-scheme: light)" />
                <link rel="icon" href="/favicon-light.ico" media="(prefers-color-scheme: dark)" />
            </head>
            <body className={`${inter.variable}`}>
                <ReduxWrapper>
                    <Header/>
                    {children}
                </ReduxWrapper>
            </body>
        </html>
    );
};
