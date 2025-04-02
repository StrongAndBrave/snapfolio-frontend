import { useGetAnswersQuery } from '@/features/posts/api/commentsApi';
import { AnswerType } from '@/features/posts/api/types/commentsTypes';
import styles from './PublicPosts.module.scss';
import Image from 'next/image';
import { getTimeAgo } from '@/shared/ui';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';

type Props = {
    postId: number;
    commentId: number;
};

export const CommentAnswers = ({ postId, commentId }: Props) => {
    const { data, isLoading, isError } = useGetAnswersQuery({
        postId,
        commentId,
        pageSize: 10,
        pageNumber: 1,
        sortBy: 'createdAt',
        sortDirection: 'asc',
    });

    if (isLoading) return <div>Загрузка ответов...</div>;
    if (isError) return <div>Ошибка загрузки ответов</div>;
    if (!data?.items?.length) return null;

    return (
        <div className={styles.answersContainer}>
            {data.items.map((answer: AnswerType) => (
                <div key={answer.id} className={styles.commentAnswer}>
                    <Image
                        src={answer.from.avatars[0]?.url || DEFAULT_AVATAR}
                        alt={answer.from.username}
                        width={36}
                        height={36}
                        className={styles.commentAvatar}
                    />
                    <div className={styles.commentAnswerContent}>
                        <p>
                            <strong>{answer.from.username}</strong>
                            {answer.content}
                        </p>
                        <small>{getTimeAgo(new Date(answer.createdAt))}</small>
                    </div>
                </div>
            ))}
        </div>
    );
};
