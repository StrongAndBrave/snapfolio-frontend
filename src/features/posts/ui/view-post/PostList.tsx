import { PostCard } from '@/features/posts/ui/view-post/PostCard';
import { PostType } from '@/features/posts/api/types/postTypes';
import styles from './PublicPosts.module.scss';

type Props = {
    posts: PostType[];
};

export const PostList = ({ posts }: Props) => {
    if (!posts || !posts.length) {
        return <div>Нет доступных постов</div>;
    }

    return (
        <section className={styles['post-list']}>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </section>
    );
};
