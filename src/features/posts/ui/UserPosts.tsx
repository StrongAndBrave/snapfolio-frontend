'use client';

import { useGetPostsByUserNameQuery } from '@/features/posts/api/postsApi';
import { PostType } from '../api/types';

export const UserPosts = () => {
    const { data, error, isLoading } = useGetPostsByUserNameQuery({
        userName: '__Rustem__',
        pageSize: 10,
        pageNumber: 1,
        sortBy: 'createdAt',
        sortDirection: 'desc',
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading posts</p>;

    return (
        <div className="user-posts" style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '20px' }}>
            {data?.items && data.items.length > 0 ? (
                data.items.map((post: PostType) => (
                    <div key={post.id} className="post">
                        {/* Автор поста */}
                        <div className="post-header">
                            <div className="post-owner">
                                <h4>
                                    {post.owner.firstName} {post.owner.lastName}
                                </h4>
                                <p className="post-username">{post.userName}</p>
                            </div>
                        </div>

                        {/* Описание поста */}
                        <div className="post-description">
                            <p>Описание: {post.description}</p>
                        </div>

                        {/* Локация (если есть) */}
                        {post.location && <p className="post-location">📍 {post.location}</p>}

                        {/* Дата и время */}
                        <div className="post-timestamp">
                            <p>Создано: {new Date(post.createdAt).toLocaleString()}</p>
                            <p>Обновлено: {new Date(post.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts found</p>
            )}
        </div>
    );
};

export default UserPosts;
