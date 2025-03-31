'use client';

import { notFound, useParams } from 'next/navigation';
import { useGetMockUserProfileQuery } from '@/shared/api/baseApi';
import React, { useEffect, useRef, useState } from 'react';
import { PostModalContent } from '@/features/public-posts';
import styles from '../../../features/public-posts/ui/PublicPosts.module.scss';
import { Modal } from '@/shared/ui';
import { comments, posts, commentsAnswers } from '@/features/public-posts/api/mockUserPosts';
import Image from 'next/image';

export const ProfilePage = () => {
    const { id } = useParams();
    const [openedPostId, setOpenedPostId] = useState<number | null>(null);
    const [visiblePosts, setVisiblePosts] = useState(4);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const { data: userProfile, isLoading, isError } = useGetMockUserProfileQuery(id);

    // Фильтруем посты для этого пользователя
    const userPosts = posts.filter(post => post.ownerId === userProfile?.id);

    // Находим текущий открытый пост
    const currentPost = userPosts.find(post => post.id === openedPostId);
    const currentPostComments = comments.filter(comment => comment.postId === openedPostId);

    const formatNumber = (number: number) => {
        return new Intl.NumberFormat('ru-RU').format(number);
    };

    const loadMorePosts = () => {
        setVisiblePosts(prev => prev + 4);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && visiblePosts < userPosts.length) {
                    loadMorePosts();
                }
            },
            { threshold: 1.0 },
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [visiblePosts, userPosts.length]);

    if (!id || Array.isArray(id)) {
        return notFound();
    }

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isError || !userProfile) {
        return notFound();
    }

    return (
        <div className={styles.profilePage}>
            <header className={styles.profileContainer}>
                <section className={styles.profileAvatarImg}>
                    <Image src={userProfile.avatars[0]} alt={userProfile.userName} width={1} height={1} />
                </section>
                <section className={styles.profileUserName}>
                    <h1>{userProfile.userName}</h1>
                </section>
                <section className={styles.profileStatus}>
                    <ul>
                        <li>
                            <span className={styles.statsNumber}>
                                {formatNumber(userProfile.userMetadata.following)}
                            </span>{' '}
                            Following
                        </li>
                        <li>
                            <span className={styles.statsNumber}>
                                {formatNumber(userProfile.userMetadata.followers)}
                            </span>{' '}
                            Followers
                        </li>
                        <li>
                            <span className={styles.statsNumber}>
                                {formatNumber(userProfile.userMetadata.publications)}
                            </span>{' '}
                            Publications
                        </li>
                    </ul>
                </section>
                <section className={styles.profileInfo}>
                    <p>{userProfile.aboutMe || 'Нет информации о себе'}</p>
                </section>
            </header>
            <div className={styles.profilePosts}>
                {/*<h1>Profile Page</h1>*/}
                <div className={styles.postsGrid}>
                    {userPosts.slice(0, visiblePosts).map(post => (
                        <Image
                            key={post.id}
                            src={post.images[0].url}
                            alt="Post"
                            width={1}
                            height={1}
                            onClick={() => setOpenedPostId(post.id)}
                        />
                    ))}
                </div>
                <div ref={loaderRef} style={{ height: '20px' }}></div>
                {currentPost && (
                    <Modal
                        isOpen={Boolean(openedPostId)}
                        className={styles.postModal}
                        onCloseAction={() => setOpenedPostId(null)}
                    >
                        <PostModalContent
                            post={currentPost}
                            comments={currentPostComments}
                            commentAnswer={commentsAnswers}
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
};
