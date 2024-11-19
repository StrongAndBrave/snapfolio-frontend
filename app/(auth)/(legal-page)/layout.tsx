import Link from 'next/link';
import styles from './LegalLayout.module.scss';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.wrapper}>
            <Link href={'/sign-up'} className={styles.link}>
                Back to Sign Up
            </Link>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
