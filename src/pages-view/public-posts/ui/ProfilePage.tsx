'use client';
import { notFound, useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PublicPage.module.scss';
import Image from 'next/image';
import { Modal } from '@/shared/ui';
import { PostModalContent } from '@/features/posts/ui/view-post';
import { useGetCommentsForUnauthorizedUsersQuery } from '@/features/posts/api/commentsApi';
import { useProfileData } from '@/features/profile/model/useProfileData';
import { useProfilePosts } from '@/features/profile/model/useProfilePosts';
import { useGetPublicPostByIdQuery } from '@/features/posts/api/postsApi';
import { ProfileHeader } from '@/features/profile';

export const ProfilePage = ({ initialPostId }: { initialPostId?: number }) => {
    const { id: userName } = useParams<{ id: string }>();
    const [openedPostId, setOpenedPostId] = useState<number | null>(initialPostId || null);
    const [visiblePosts, setVisiblePosts] = useState(4);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const { data: userProfile, isLoading: isProfileLoading, isError: isProfileError } = useProfileData(userName);

    const {
        data: postsData,
        isLoading: isPostsLoading,
        isError: isPostsError,
    } = useProfilePosts(userProfile?.id || 0, visiblePosts);

    const { data: currentPost } = useGetPublicPostByIdQuery({ postId: openedPostId! }, { skip: !openedPostId });

    const { data: postComments } = useGetCommentsForUnauthorizedUsersQuery(
        { postId: openedPostId!, pageSize: 10, pageNumber: 1, sortBy: 'createdAt', sortDirection: 'desc' },
        { skip: !openedPostId },
    );

    // Обработчики и эффекты
    const handleCloseModal = useCallback(() => {
        setOpenedPostId(null);
        router.replace(`/profile/${userName}`, { scroll: false });
    }, [userName, router]);

    useEffect(() => {
        if (initialPostId) setOpenedPostId(initialPostId);
    }, [initialPostId]);

    useEffect(() => {
        if (openedPostId) {
            const url = new URL(window.location.href);
            url.searchParams.set('postId', String(openedPostId));
            window.history.pushState({}, '', url.toString());
        }
    }, [openedPostId]);

    const formatNumber = (number: number) => new Intl.NumberFormat('ru-RU').format(number);

    // Логика бесконечной загрузки
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && postsData?.items && visiblePosts < postsData.totalCount) {
                    setVisiblePosts(prev => prev + 4);
                }
            },
            { threshold: 1.0 },
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visiblePosts, postsData?.totalCount]);

    // Обработка состояний загрузки и ошибок
    if (!userName || Array.isArray(userName)) return notFound();
    if (isProfileLoading || isPostsLoading) return <div>Загрузка...</div>;
    if (isProfileError || !userProfile || isPostsError) return notFound();

    const userPosts = postsData?.items || [];

    return (
        <div className={styles.profilePage}>
            <ProfileHeader userProfile={userProfile} formatNumber={formatNumber} />

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
                        <div ref={loaderRef} style={{ height: '20px' }} />
                    </>
                )}
            </div>

            {currentPost && (
                <Modal isOpen={Boolean(openedPostId)} onClose={handleCloseModal} className={styles.postModal}>
                    <PostModalContent
                        postId={currentPost.id}
                        comments={postComments?.items}
                        onClose={handleCloseModal}
                    />
                </Modal>
            )}
        </div>
    );
};
