import { PostRedirect } from '@/features/posts/ui/view-post/PostRedirect';

export default function PostPage({ params }: { params: { postId: string } }) {
    return <PostRedirect postId={Number(params.postId)} />;
}
