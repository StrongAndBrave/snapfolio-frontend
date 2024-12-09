'use client';

import styles from './RegistredUsers.module.scss';
import { postsApi } from '@/shared/services/posts/posts';

export const RegistredUsers = () => {
    const { data, isLoading } = postsApi.useGetTotalCountUsersQuery();
    const numberString = data?.totalCount.toString().padStart(6, '0');
    const digits = numberString?.split('');

    if (isLoading) {
        return <>Loading...</>;
    }

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1>Registred users:</h1>
                <div className={styles.count}>
                    {digits ? (
                        <ul className={styles.list}>
                            {digits.map((digit, index) => (
                                <li key={index} className={styles.cell}>
                                    {digit}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className={styles.list}>
                            {[0, 0, 0, 0, 0, 0].map((digit, index) => (
                                <li key={index} className={styles.cell}>
                                    {digit}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};
