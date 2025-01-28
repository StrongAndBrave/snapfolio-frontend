import { CreatePost } from '@/features/posts/ui/CreatePost';
import { GetPostById } from '@/features/posts/ui/GetPostById';
import { GetPostByUsername } from '@/features/posts/ui/GetPostsByUsername';

export default function Home() {
    return (
        <div>
            <h1>Profile</h1>
            <GetPostByUsername />
            <CreatePost />
            <GetPostById postId={4524} />
        </div>
    );
}
