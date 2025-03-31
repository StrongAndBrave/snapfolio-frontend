import styles from './PublicPage.module.scss';
import Link from 'next/link';
import { AllUsers } from '@/features/public-posts/ui/AllUsers';
import { PublicPosts } from '@/features/public-posts/ui/PublicPosts';
import { PostList } from '@/features/public-posts';

export const PublicPage = () => {
    return (
        <main className={styles['public-page']}>
            <h1>Main page</h1>
            <nav className={styles.nav}>
                <Link href={'/profile'}>Profile</Link>
                <Link href={'/auth/sign-in'}>Sign In</Link>
                <Link href={'/auth/sign-up'}>Sign Up</Link>
                <Link href={'/auth/new-password'}>New Password</Link>
            </nav>
            <AllUsers />
            <PostList />
            {/*<PublicPosts />*/}
        </main>
    );
};
