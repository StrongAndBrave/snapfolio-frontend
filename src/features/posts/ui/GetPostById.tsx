'use client';

import { useGetPostByIdQuery } from '../api/postsApi'; // Импорт хука из RTK Query slice

type PostProps = {
    postId: number;
};

export const GetPostById: React.FC<PostProps> = ({ postId }) => {
    const { data: post, isLoading, isError } = useGetPostByIdQuery({ postId });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading post</div>;
    }

    if (!post) {
        return <div>No post found</div>;
    }

    return (
        <div
            className="p-4 border rounded-xl shadow-md bg-white max-w-lg mx-auto"
            style={{ backgroundColor: 'red', margin: '20px' }}
        >
            <h3 className="text-2xl font-bold mb-2">{post.userName}</h3>
            <p className="text-gray-600">{post.description}</p>
            <div className="mt-4 text-sm text-gray-500">Post ID: {post.id}</div>
        </div>
    );
};
