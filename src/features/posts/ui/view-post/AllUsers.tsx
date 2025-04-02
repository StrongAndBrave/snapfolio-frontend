'use client';
import styles from './PublicPosts.module.scss';
import { useGetAllPublicUsersQuery } from '@/features/posts/api/postsApi';

export const AllUsers = () => {
    const { data, isLoading, isError } = useGetAllPublicUsersQuery();

    if (isLoading) return <div>Загрузка...</div>;
    if (isError) return <div>Ошибка загрузки</div>;

    const formattedCount = data?.totalCount.toString().padStart(6, '0') || '000000';
    return (
        <>
            <div className={styles.registeredUsers}>
                <h2>Registered users:</h2>
                <div className={styles.userCount}>
                    <h2>
                        {formattedCount.split('').map((i, id) => (
                            <span className={styles.userCountItem} key={id}>
                                {i}
                                {id < formattedCount.length - 1 && <span className={styles.userRowItem} />}
                            </span>
                        ))}
                    </h2>
                </div>
            </div>
        </>
    );
};
