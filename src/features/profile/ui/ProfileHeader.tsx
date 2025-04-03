import Image from 'next/image';
import styles from './Profile.module.scss';

interface ProfileHeaderProps {
    userProfile: {
        avatars: { url: string }[];
        userName: string;
        userMetadata: {
            following: number;
            followers: number;
            publications: number;
        };
        aboutMe?: string;
    };
    formatNumber: (num: number) => string;
}

export const ProfileHeader = ({ userProfile, formatNumber }: ProfileHeaderProps) => (
    <header className={styles.profileContainer}>
        <section className={styles.profileAvatarImg}>
            {userProfile.avatars?.length > 0 && (
                <Image src={userProfile.avatars[0].url} alt={userProfile.userName} width={1} height={1} priority />
            )}
        </section>
        <section className={styles.profileUserName}>
            <h1>{userProfile.userName}</h1>
        </section>
        <section className={styles.profileStatus}>
            <ul>
                <li>
                    <span className={styles.statsNumber}>{formatNumber(userProfile.userMetadata.following)}</span>{' '}
                    Following
                </li>
                <li>
                    <span className={styles.statsNumber}>{formatNumber(userProfile.userMetadata.followers)}</span>{' '}
                    Followers
                </li>
                <li>
                    <span className={styles.statsNumber}>{formatNumber(userProfile.userMetadata.publications)}</span>{' '}
                    Publications
                </li>
            </ul>
        </section>
        <section className={styles.profileInfo}>
            <p>{userProfile.aboutMe || 'Информация о пользователе отсутствует'}</p>
        </section>
    </header>
);
