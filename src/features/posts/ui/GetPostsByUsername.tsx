'use client';

import { useDeletePostByIdMutation, useGetPostsByUserNameQuery } from '@/features/posts/api/postsApi';
import { PostType } from '../api/types/postTypes';

export const GetPostByUsername = () => {
    const { data, error, isLoading } = useGetPostsByUserNameQuery({
        userName: '___Rustem___',
        pageSize: 10,
        pageNumber: 1,
        sortBy: 'createdAt',
        sortDirection: 'desc',
    });

    const [deletePost, {}] = useDeletePostByIdMutation();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading posts</p>;

    return (
        <div className="user-posts" style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '20px' }}>
            {data?.items && data.items.length > 0 ? (
                data.items.map((post: PostType) => (
                    <div key={post.id} className="post">
                        <div className="post-header">
                            <div className="post-owner">
                                <h4>
                                    {post.owner.firstName} {post.owner.lastName}
                                </h4>
                                <p className="post-username">{post.userName}</p>
                            </div>
                        </div>
                        <div className="post-description">
                            <p>Описание: {post.description}</p>
                        </div>

                        {post.location && <p className="post-location">{post.location}</p>}

                        <div className="post-timestamp">
                            <p>Создано: {new Date(post.createdAt).toLocaleString()}</p>
                            <p>Обновлено: {new Date(post.updatedAt).toLocaleString()}</p>
                        </div>
                        <div className="">{post.id}</div>
                        <button
                            onClick={() => {
                                deletePost({ postId: post.id });
                            }}
                            style={{ backgroundColor: 'red', padding: '5px' }}
                        >
                            Удалить
                        </button>
                    </div>
                ))
            ) : (
                <p>No posts found</p>
            )}
        </div>
    );
};
