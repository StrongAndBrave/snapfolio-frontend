'use client';

import { useGetPublicPostByIdQuery } from '@/features/posts/api/postsApi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function PostRedirect({ postId }: { postId: number }) {
    const { data: post, isLoading, isError } = useGetPublicPostByIdQuery({ postId });
    const router = useRouter();

    useEffect(() => {
        if (post && !isLoading && !isError) {
            router.replace(`/profile/${post.userName}?postId=${postId}`);
        }
    }, [post, isLoading, isError, router, postId]);

    if (isLoading) return <div>Loading post...</div>;
    if (isError) return <div>Failed to load post</div>;

    return null;
}
