import { PostRedirect } from '@/features/posts/ui/view-post/PostRedirect';

type Props = {
    params: { postId: string }
}

export default function PostPage({ params }: Props) {
    return <PostRedirect postId={Number(params.postId)} />;
}
