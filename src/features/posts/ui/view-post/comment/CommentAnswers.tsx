import styles from './Comment.module.scss';
import Image from 'next/image';
import { getTimeAgo } from '@/shared/ui';
import { DEFAULT_AVATAR } from '@/pages-view/public-posts/ui/PublicPage';
import { useCommentAnswers } from '@/features/posts/model/useCommnets';

type Props = {
    postId: number;
    commentId: number;
};

export const CommentAnswers = ({ postId, commentId }: Props) => {
    const { answers, isLoading, isError } = useCommentAnswers(postId, commentId);

    if (isLoading) return <div>Загрузка ответов...</div>;
    if (isError) return <div>Ошибка загрузки ответов</div>;
    if (!answers.length) return null;

    return (
        <div className={styles.answersContainer}>
            {answers.map(answer => (
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
