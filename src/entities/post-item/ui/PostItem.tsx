'use client';
import Image from 'next/image';
import { Post } from '../model/types';
import styles from './PostItem.module.scss';
import { getTimeAgo } from '@/shared/helpers/getTimeAgo';
import personSVG from '../../../../public/svg/person.svg';

type Props = {
    item: Post;
};
export const PostItem = ({ item }: Props) => {
    const { images, avatarOwner, userName, updatedAt, description } = item;
    const timeAgo = getTimeAgo(updatedAt);

    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <Image src={images[0].url} alt={''} width={images[0].width} height={images[0].height} />
            </div>
            <div className={styles['user-info']}>
                {' '}
                {/* сделать ссылку на юрл профайла  */}
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <Image
                            src={avatarOwner !== undefined ? avatarOwner : personSVG}
                            width={36}
                            height={36}
                            alt={`avatar ${userName}`}
                        />
                    </div>
                    <p>{userName}</p>
                </div>
                <div></div>
            </div>
            <span className={styles.interval}>{timeAgo}</span>
            {description && <p className={styles.text}>{description}</p>}
        </div>
    );
};
