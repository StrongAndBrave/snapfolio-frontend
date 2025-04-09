'use client';
import { PublicProfile } from '@/pages-view/public-profile/ui/PublicProfile';
import { useSearchParams } from 'next/navigation';

export function ProfilePageWrapper() {
    const searchParams = useSearchParams();
    const postId = searchParams.get('postId');

    return <PublicProfile initialPostId={postId ? Number(postId) : undefined} />;
}
