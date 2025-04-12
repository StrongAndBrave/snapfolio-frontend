'use client';
import React, { useEffect, useState } from 'react';
import styles from './PublicPosts.module.scss';
import { getTimeAgo } from '@/shared/ui/time-utils';
import Image from 'next/image';
import Link from 'next/link';
import { PostType } from '@/features/posts/api/types/postTypes';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';

type Props = {
    post: PostType;
};

export const PostCard: React.FC<Props> = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [descriptionError, setDescriptionError] = useState('');

    useEffect(() => {
        if (post.description.length > 30) {
            const firstChars = post.description.slice(0, 30);
            const remainingText = post.description.slice(30);

            if (!firstChars.includes(' ') && !remainingText.startsWith(' ')) {
                setDescriptionError('Некорректное описание поста');
            } else {
                setDescriptionError('');
            }
        }
    }, [post.description]);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const detectLanguage = (text: string): 'ru' | 'en' => {
        const cyrillicPattern = /[\u0400-\u04FF]/;
        return cyrillicPattern.test(text) ? 'ru' : 'en';
    };

    const truncateText = (text: string, maxLengthRu: number, maxLengthEn: number) => {
        const language = detectLanguage(text);
        const maxLength = language === 'ru' ? maxLengthRu : maxLengthEn;

        if (text.length <= maxLength) return text;

        const truncated = text.slice(0, maxLength).trim();
        return `${truncated}...`;
    };

    const formattedDate = getTimeAgo(new Date(post.createdAt));

    const hasImages = post.images?.length > 0;
    const hasAvatar = !!post.avatarOwner;

    return (
        <article className={styles.postCard}>
            <Link href={`/profile/${post.ownerId}?postId=${post.id}`}>
                {hasImages ? (
                    <Image src={post.images[0].url} alt="Post" className={styles.postImage} width={1} height={1} />
                ) : (
                    <p>No Images</p>
                )}
            </Link>
            <div className={`${styles.postInfo} ${isExpanded ? styles.expanded : ''}`}>
                <div className={`${styles.postContent} ${isExpanded ? styles.expanded : ''}`}>
                    <div className={styles.userHeader}>
                        <Link href={`/profile/${post.ownerId}`}>
                            {hasAvatar ? (
                                <Image
                                    src={post.avatarOwner}
                                    alt={`Аватар пользователя ${post.userName}`}
                                    className={styles.avatar}
                                    width={40}
                                    height={40}
                                />
                            ) : (
                                <Image
                                    src={DEFAULT_AVATAR}
                                    alt={`Аватар пользователя ${post.userName}`}
                                    className={styles.avatar}
                                    width={40}
                                    height={40}
                                />
                            )}
                        </Link>
                        <div className={styles.userName}>
                            <Link href={`/profile/${post.ownerId}`}>{post.userName}</Link>
                        </div>
                        {isExpanded && (
                            <div className={styles.collapseCloseButton}>
                                <Image
                                    src={'/svg/close-icon.svg' || null}
                                    alt="Свернуть текст"
                                    onClick={toggleDescription}
                                    width={24}
                                    height={24}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.postDate}>{formattedDate}</div>
                    {descriptionError ? (
                        <div className={styles.postDescription}>
                            <p>{descriptionError}</p>
                        </div>
                    ) : (
                        <div className={styles.postDescription}>
                            <p>
                                {isExpanded ? (
                                    <>
                                        {post.description.length >
                                        (detectLanguage(post.description) === 'ru' ? 170 : 230)
                                            ? truncateText(post.description, 170, 230)
                                            : post.description}{' '}
                                        <button onClick={toggleDescription}>Hide</button>
                                    </>
                                ) : (
                                    <>
                                        {truncateText(post.description, 70, 70)}
                                        {post.description.length > 70 && (
                                            <>
                                                {' '}
                                                <button onClick={toggleDescription}>Show more</button>
                                            </>
                                        )}
                                    </>
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};
