'use client';
import { ProfilePage as BaseProfilePage } from '@/pages-view/public-posts/ui/ProfilePage';
import { useSearchParams } from 'next/navigation';

export function ProfilePageWrapper() {
    const searchParams = useSearchParams();
    const postId = searchParams.get('postId');

    return <BaseProfilePage initialPostId={postId ? Number(postId) : undefined} />;
}
