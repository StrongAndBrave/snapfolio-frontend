'use client';
import React, { useEffect, useState } from 'react';
import styles from './PublicPosts.module.scss';
import { getTimeAgo } from '@/shared/ui/time-utils';
import Image from 'next/image';
import Link from 'next/link';
import { PostType } from '@/features/posts/api/types/postTypes';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';

type PostCardProps = {
    post: PostType;
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [descriptionError, setDescriptionError] = useState('');

    useEffect(() => {
        if (post.description.length > 30) {
            const firstChars = post.description.slice(0, 30);
            const remainingText = post.description.slice(30);

            // Проверяем, есть ли пробел в первых 30 символах или после них
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

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '... ' : text;
    };

    const formattedDate = getTimeAgo(new Date(post.createdAt));

    const hasImages = post.images?.length > 0;
    const hasAvatar = !!post.avatarOwner;

    return (
        <article className={styles['post-card']}>
            <Link href={`/profile/${post.ownerId}`}>
                {hasImages ? (
                    <Image src={post.images[0].url} alt="Post" className={styles['post-image']} width={1} height={1} />
                ) : (
                    <p>No Images</p>
                )}
            </Link>
            <div className={`${styles['post-info']} ${isExpanded ? styles.expanded : ''}`}>
                <div className={`${styles['post-content']} ${isExpanded ? styles.expanded : ''}`}>
                    <Link href={`/profile/${post.ownerId}`}>
                        {hasAvatar ? (
                            <Image
                                src={post.avatarOwner}
                                alt={`Аватар пользователя ${post.userName}`}
                                className={styles['avatar']}
                                width={40}
                                height={40}
                            />
                        ) : (
                            <Image
                                src={DEFAULT_AVATAR}
                                alt={`Аватар пользователя ${post.userName}`}
                                className={styles['avatar']}
                                width={40}
                                height={40}
                            />
                        )}
                    </Link>
                    <div className={styles['user-name']}>
                        <Link href={`/profile/${post.ownerId}`}>{post.userName}</Link>
                    </div>
                    {isExpanded && (
                        <Image
                            src={'/svg/close-icon.svg' || null}
                            alt="Свернуть текст"
                            className={styles['collapse-image-button']}
                            onClick={toggleDescription}
                            width={24}
                            height={24}
                        />
                    )}

                    <div className={styles['post-date']}>{formattedDate}</div>
                    {descriptionError ? (
                        <div className={styles['post-description']}>
                            <p>{descriptionError}</p>
                        </div>
                    ) : (
                        <div
                            className={`${styles['post-description']} ${isExpanded ? styles.expanded : styles.collapsed}`}
                        >
                            <p>
                                {isExpanded ? (
                                    <>
                                        {post.description.length > 150
                                            ? truncateText(post.description, 150)
                                            : post.description}
                                        <button onClick={toggleDescription} className={styles['hide-button']}>
                                            Hide
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {truncateText(post.description, 70)}
                                        {post.description.length > 70 && (
                                            <button onClick={toggleDescription} className={styles['show-more-button']}>
                                                Show more
                                            </button>
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
