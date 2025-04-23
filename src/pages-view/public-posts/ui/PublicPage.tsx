import { PostList } from '@/features/posts/ui';
import { AllUsers } from '@/features/all-users';
import styles from './PublicPage.module.scss';
import DefaultAvatar from '../../../../public/default_avatar.png';
export const DEFAULT_AVATAR = DefaultAvatar;

export const PublicPage = async () => {
    const API_URL = 'https://inctagram.work/api/v1/public-posts/all/0';
    try {
        const res = await fetch(`${API_URL}?sortDirection=desc&pageSize=12`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error(`Ошибка HTTP: ${res.status}`);
        }

        const data = await res.json();
        const posts = data?.items || [];

        return (
            <main className={styles.publicPage}>
                <AllUsers />
                <PostList posts={posts} />
            </main>
        );
    } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
        return <> Ошибка при загрузке постов: </>;
    }
};
