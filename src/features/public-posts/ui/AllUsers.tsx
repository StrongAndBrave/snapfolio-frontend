import styles from './PublicPosts.module.scss';

export const AllUsers = () => {
    const userCount = '009213';
    return (
        <>
            <div className={styles['registered-users']}>
                <h2>Registered users:</h2>
                <div className={styles['user-count']}>
                    <h2>
                        {userCount.split('').map((i, id) => (
                            <span className={styles['user-count-item']} key={id}>
                                {i}
                                {id < userCount.length - 1 && <span className={styles.sepa} />}
                            </span>
                        ))}
                    </h2>
                </div>
            </div>
        </>
    );
};
