'use client';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import styles from './PublicPage.module.scss';
import { Modal } from '@/shared/ui';
import Image from 'next/image';
import { PostModalContent } from '@/features/posts/ui/view-post';
import {
    useGetPostsByUserIdQuery,
    useGetPublicPostByIdQuery,
    useGetPublicUserProfileQuery,
} from '@/features/posts/api/postsApi';
import { useGetCommentsForUnauthorizedUsersQuery } from '@/features/posts/api/commentsApi';

export const ProfilePage = () => {
    const { id: userName } = useParams<{ id: string }>();
    const [openedPostId, setOpenedPostId] = useState<number | null>(null);
    const [visiblePosts, setVisiblePosts] = useState(4);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const {
        data: userProfile,
        isLoading: isProfileLoading,
        isError: isProfileError,
    } = useGetPublicUserProfileQuery(userName);

    const {
        data: postsData,
        isLoading: isPostsLoading,
        isError: isPostsError,
    } = useGetPostsByUserIdQuery(
        {
            userId: userProfile?.id || 0,
            endCursorPostId: 0,
            pageSize: visiblePosts,
            sortBy: 'createdAt',
            sortDirection: 'desc',
        },
        { skip: !userProfile?.id },
    );

    const { data: currentPost, isLoading: isCurrentPostLoading } = useGetPublicPostByIdQuery(
        { postId: openedPostId! },
        { skip: !openedPostId },
    );
    const { data: postComments } = useGetCommentsForUnauthorizedUsersQuery(
        {
            postId: openedPostId!,
            pageSize: 10,
            pageNumber: 1,
            sortBy: 'createdAt',
            sortDirection: 'desc',
        },
        { skip: !openedPostId },
    );

    const formatNumber = (number: number) => {
        return new Intl.NumberFormat('ru-RU').format(number);
    };

    const loadMorePosts = () => {
        if (postsData && visiblePosts < postsData.totalCount) {
            setVisiblePosts(prev => prev + 4);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && postsData?.items && visiblePosts < postsData.totalCount) {
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
    }, [visiblePosts, postsData?.totalCount]);

    if (!userName || Array.isArray(userName)) {
        return notFound();
    }

    if (isProfileLoading || isPostsLoading) {
        return <div>Загрузка...</div>;
    }

    if (isProfileError || !userProfile || isPostsError) {
        return notFound();
    }

    const userPosts = postsData?.items || [];

    return (
        <div className={styles.profilePage}>
            <header className={styles.profileContainer}>
                <section className={styles.profileAvatarImg}>
                    {userProfile.avatars?.length > 0 && (
                        <Image
                            src={userProfile.avatars[0].url}
                            alt={userProfile.userName}
                            width={1}
                            height={1}
                            priority
                        />
                    )}
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
                    <p>{userProfile.aboutMe || 'Информация о пользователе отсутствует'}</p>
                </section>
            </header>
            <div className={styles.profilePosts}>
                {userPosts.length === 0 ? (
                    <div className={styles.noPostsMessage}>У пользователя нет постов</div>
                ) : (
                    <>
                        <div className={styles.postsGrid}>
                            {userPosts.map(post => (
                                <Image
                                    key={post.id}
                                    src={post.images[0]?.url || '/default-post-image.png'}
                                    alt="Post"
                                    width={1}
                                    height={1}
                                    onClick={() => setOpenedPostId(post.id)}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                        <div ref={loaderRef} style={{ height: '20px' }}></div>
                        {currentPost && (
                            <Modal
                                isOpen={Boolean(openedPostId)}
                                className={styles.postModal}
                                onClose={() => setOpenedPostId(null)}
                            >
                                <PostModalContent postId={currentPost.id} comments={postComments?.items} />
                            </Modal>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
