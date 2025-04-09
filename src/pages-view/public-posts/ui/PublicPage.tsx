import styles from './PublicPage.module.scss';
import { PostList } from '@/features/posts/ui';
import { AllUsers } from '@/features/all-users';
import DefaultAvatar from '../../../../public/default_avatar.png';

export const DEFAULT_AVATAR = DefaultAvatar;

export const PublicPage = () => {
    return (
        <main className={styles.publicPage}>
            <AllUsers />
            <PostList />
        </main>
    );
};
