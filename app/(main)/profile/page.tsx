import { CreatePost } from '@/features/posts/ui/CreatePost';
import { UserPosts } from '@/features/posts/ui/UserPosts';

export default function Home() {
    return (
        <div>
            <h1>Profile</h1>
            <UserPosts />
            <CreatePost />
        </div>
    );
}
