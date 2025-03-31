'use client';
import React, { useState } from 'react';
import styles from './PublicPosts.module.scss';
import { getTimeAgo } from '@/shared/ui/time-utils';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/features/public-posts/model';

type PostCardProps = {
    post: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    const isTextShort = post.description.length >= 30;

    const detectLanguage = (text: string) => {
        // Регулярное выражение для поиска кириллицы
        const cyrillicRegex = /[а-яА-ЯёЁ]/;
        return cyrillicRegex.test(text) ? 'ru' : 'en';
    };

    const truncateText = (text: string, maxLengthRu: number, maxLengthEn: number) => {
        const language = detectLanguage(text);
        const maxLength = language === 'ru' ? maxLengthRu : maxLengthEn;

        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '... ';
        }
        return text;
    };

    const formattedDate = getTimeAgo(new Date(post.createdAt));

    return (
        <article className={styles['post-card']}>
            <Link href={`/profile/${post.ownerId}`}>
                <Image src={post.images[0].url} alt="Post" className={styles['post-image']} width={1} height={1} />
            </Link>
            <div className={`${styles['post-info']} ${isExpanded ? styles.expanded : ''}`}>
                <div className={`${styles['post-content']} ${isExpanded ? styles.expanded : ''}`}>
                    <Link href={`/profile/${post.ownerId}`}>
                        <Image
                            src={post.avatarOwner}
                            alt={`Аватар пользователя ${post.userName}`}
                            className={styles['avatar']}
                            width={40}
                            height={40}
                        />
                    </Link>
                    <div className={styles['user-name']}>
                        <Link href={`/profile/${post.ownerId}`}>{post.userName}</Link>
                    </div>
                    {isExpanded && (
                        <Image
                            src={'/svg/close-icon.svg'}
                            alt="Свернуть текст"
                            className={styles['collapse-image-button']}
                            onClick={toggleDescription}
                            width={24}
                            height={24}
                        />
                    )}

                    <div className={styles['post-date']}>{formattedDate}</div>

                    <div className={`${styles['post-description']} ${isExpanded ? styles.expanded : styles.collapsed}`}>
                        <p>
                            {/* Если текст раскрыт и его длина больше 230 символов, обрезаем его */}
                            {isExpanded && (post.description.length > 200 || post.description.length > 230) ? (
                                <>
                                    {truncateText(post.description, 180, 230)}
                                    <button onClick={toggleDescription} className={styles['hide-button']}>
                                        Hide
                                    </button>
                                </>
                            ) : // Если текст не раскрыт или его длина меньше 230 символов, отображаем его полностью или обрезаем до 70 символов
                            isExpanded ? (
                                post.description
                            ) : (
                                truncateText(post.description, 70, 70)
                            )}
                            {!isExpanded && post.description.length > 70 && (
                                <button onClick={toggleDescription} className={styles['show-more-button']}>
                                    Show more
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};
