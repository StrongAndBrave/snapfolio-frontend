'use client';
import { notFound, useParams } from 'next/navigation';
import { PublicProfileContent } from '@/features/profile/ui/PublicProfileContent';

export const PublicProfile = ({ initialPostId }: { initialPostId?: number }) => {
    const { id: userName } = useParams<{ id: string }>();

    if (!userName || Array.isArray(userName)) return notFound();

    return <PublicProfileContent userName={userName} initialPostId={initialPostId} onNotFound={() => notFound()} />;
};
