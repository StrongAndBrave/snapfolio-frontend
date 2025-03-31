'use client';
import React, { useState } from 'react';
import styles from './PublicPosts.module.scss';
import Image from 'next/image';
import { getTimeAgo } from '@/shared/ui/time-utils';
import { PhotoSlider } from '@/shared/ui';

import { CommentAnswer, Post, Comment } from '@/features/public-posts/model';

// type PostModalContentProps = {
//     post: Post;
//     comments: Comment[];
//     commentAnswer: CommentAnswer[];
// };
//
// export const PostModalContent = ({ post, comments, commentAnswer }: PostModalContentProps) => {
//     const [showAllComments, setShowAllComments] = useState(false);
//     const [visibleCommentsCount, setVisibleCommentsCount] = useState(0);
//     const commentsRef = useRef<HTMLDivElement | null>(null);
//
//     useEffect(() => {
//         const calculateVisibleComments = () => {
//             if (commentsRef.current) {
//                 const blockHeight = 260; // Высота блока комментариев
//                 const commentElements = commentsRef.current.querySelectorAll(`.${styles.comment}`);
//
//                 let totalHeight = 0;
//                 let count = 0;
//                 for (let i = 0; i < commentElements.length; i++) {
//                     const commentHeight = commentElements[i].getBoundingClientRect().height;
//                     totalHeight += commentHeight;
//                     if (totalHeight > blockHeight) break;
//                     console.log('commentHeight: ', commentHeight);
//                     console.log('totalHeight: ', totalHeight);
//                     count++;
//                 }
//
//                 setVisibleCommentsCount(count);
//             }
//         };
//
//         calculateVisibleComments();
//         const timeoutId = setTimeout(calculateVisibleComments, 10);
//         window.addEventListener('resize', calculateVisibleComments);
//
//         return () => {
//             clearTimeout(timeoutId);
//             window.removeEventListener('resize', calculateVisibleComments);
//         };
//     }, [comments]);
//
//     // Определяем, нужно ли показывать кнопку "View Answers"
//     const shouldShowViewAnswers = comments.length > visibleCommentsCount;
//
//     // Определяем, нужно ли показывать последний комментарий отдельно
//     const shouldShowLastComment = shouldShowViewAnswers && !showAllComments;
//
//     // Видимые комментарии
//     const visibleComments = showAllComments
//         ? comments
//         : comments.slice(0, shouldShowLastComment ? visibleCommentsCount - 1 : visibleCommentsCount);
//
//     // Количество скрытых комментариев
//     const hiddenCommentsCount = comments.length - visibleComments.length - (shouldShowLastComment ? 1 : 0);
//
//     const likesCount = post.likesCount.toLocaleString('ru-RU');
//
//     // mokAva добавил потому что в console в браузере ошибки на src пустые
//     const mokAva =
//         'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192';
//     console.log({
//         commentsLength: comments.length,
//         visibleCommentsCount,
//         shouldShowViewAnswers,
//         hiddenCommentsCount,
//     });
//     return (
//         <>
//             <div className={styles.postImage}>
//                 <PhotoSlider images={post.images} />
//             </div>
//
//             <div className={styles.postContent}>
//                 <div className={styles.postOwner}>
//                     <Image
//                         src={post.avatarOwner || mokAva}
//                         width={36}
//                         height={36}
//                         alt={`${post.userName} avatar`}
//                         className={styles.commentAvatar}
//                     />
//                     <strong>{post.userName}</strong>
//                 </div>
//
//                 <div className={styles.commentsSection} ref={commentsRef}>
//                     <div className={styles.comment}>
//                         <Image
//                             src={post.avatarOwner || mokAva}
//                             width={36}
//                             height={36}
//                             alt={`${post.userName} avatar`}
//                             className={styles.commentAvatar}
//                         />
//                         <div className={styles.commentContent}>
//                             <p>
//                                 <strong>{post.userName}</strong>
//                                 {post.description}
//                             </p>
//                             <small>{getTimeAgo(new Date(post.createdAt))}</small>
//                         </div>
//                     </div>
//                     {visibleComments.map(comment => (
//                         <div key={comment.id} className={styles.comment}>
//                             <Image
//                                 src={comment.from.avatars[0]?.url || mokAva}
//                                 alt={comment.from.username}
//                                 width={36}
//                                 height={36}
//                                 className={styles.commentAvatar}
//                             />
//                             <div className={styles.commentContent}>
//                                 <p>
//                                     <strong>{comment.from.username}</strong>
//                                     {comment.content}
//                                 </p>
//                                 <small>{getTimeAgo(new Date(comment.createdAt))}</small>
//
//                                 {commentAnswer
//                                     .filter(answer => answer.commentId === comment.id) // Фильтруем ответы по commentId
//                                     .map(answer => (
//                                         <div key={answer.id} className={styles.answer}>
//                                             <Image
//                                                 src={answer.from.avatars[0]?.url || mokAva}
//                                                 alt={answer.from.username}
//                                                 width={24}
//                                                 height={24}
//                                                 className={styles.commentAvatar}
//                                             />
//                                             <div className={styles.answerContent}>
//                                                 <p>
//                                                     <strong>{answer.from.username}</strong>
//                                                     {answer.content}
//                                                 </p>
//                                                 <small>{getTimeAgo(new Date(answer.createdAt))}</small>
//                                             </div>
//                                         </div>
//                                     ))}
//                             </div>
//                         </div>
//                     ))}
//                     {hiddenCommentsCount > 0 && !showAllComments && (
//                         <div className={styles.viewMore} onClick={() => setShowAllComments(true)}>
//                             <p>View Answers ({hiddenCommentsCount})</p>
//                         </div>
//                     )}
//                     {shouldShowLastComment && (
//                         <div className={styles.comment}>
//                             <Image
//                                 src={comments[comments.length - 1].from.avatars[0]?.url || mokAva}
//                                 alt={comments[comments.length - 1].from.username}
//                                 width={36}
//                                 height={36}
//                                 className={styles.commentAvatar}
//                             />
//                             <div className={styles.commentContent}>
//                                 <p>
//                                     <strong>{comments[comments.length - 1].from.username}</strong>
//                                     {comments[comments.length - 1].content}
//                                 </p>
//                                 <small>{getTimeAgo(new Date(comments[comments.length - 1].createdAt))}</small>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//                 <div className={styles.postInformation}>
//                     <div className={styles.avatarsWhoLikes}>
//                         {post.avatarWhoLikes.map((avatar, index) => (
//                             <Image
//                                 key={index}
//                                 src={avatar}
//                                 alt={`User ${index}`}
//                                 width={1}
//                                 height={1}
//                                 className={styles.avatarWhoLikes}
//                             />
//                         ))}
//                     </div>
//                     <span className={styles.postLikes}>
//                         {likesCount} <strong>"Like"</strong>
//                     </span>
//                 </div>
//                 <div className={styles.postDate}>
//                     <small>{getTimeAgo(new Date(post.createdAt))}</small>
//                 </div>
//             </div>
//         </>
//     );
// };
type PostModalContentProps = {
    post: Post;
    comments: Comment[];
    commentAnswer: CommentAnswer[];
};

export const PostModalContent = ({ post, comments, commentAnswer }: PostModalContentProps) => {
    // Состояние для хранения ID комментариев, у которых открыты ответы
    const [expandedCommentIds, setExpandedCommentIds] = useState<number[]>([]);

    const likesCount = post.likesCount.toLocaleString('ru-RU');

    // mokAva добавил потому что в console в браузере ошибки на src пустые
    const mokAva =
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/7654cdb7-5cd9-4021-8a17-21cf81eedbac_users/46/avatar/45f17429-9126-47ce-97f0-559fac89bf0e-images-192x192';

    // Функция для переключения отображения ответов на комментарий
    const toggleAnswers = (commentId: number) => {
        if (expandedCommentIds.includes(commentId)) {
            // Если ответы уже открыты, закрываем их (удаляем ID из массива)
            setExpandedCommentIds(expandedCommentIds.filter(id => id !== commentId));
        } else {
            // Если ответы закрыты, открываем их (добавляем ID в массив)
            setExpandedCommentIds([...expandedCommentIds, commentId]);
        }
    };

    return (
        <>
            <div className={styles.postImage}>
                <PhotoSlider images={post.images} />
            </div>

            <div className={styles.postContent}>
                <div className={styles.postOwner}>
                    <Image
                        src={post.avatarOwner || mokAva}
                        width={36}
                        height={36}
                        alt={`${post.userName} avatar`}
                        className={styles.commentAvatar}
                    />
                    <strong>{post.userName}</strong>
                </div>

                <div className={styles.commentsSection}>
                    <div className={styles.comment}>
                        <Image
                            src={post.avatarOwner || mokAva}
                            width={36}
                            height={36}
                            alt={`${post.userName} avatar`}
                            className={styles.commentAvatar}
                        />
                        <div className={styles.commentContent}>
                            <p>
                                <strong>{post.userName}</strong>
                                {post.description}
                            </p>
                            <small>{getTimeAgo(new Date(post.createdAt))}</small>
                        </div>
                    </div>

                    {/* Отображение всех комментариев */}
                    {comments.map(comment => {
                        const hasAnswers = commentAnswer.some(answer => answer.commentId === comment.id);
                        const isExpanded = expandedCommentIds.includes(comment.id);

                        return (
                            <div key={comment.id} className={styles.comment}>
                                <Image
                                    src={comment.from.avatars[0]?.url || mokAva}
                                    alt={comment.from.username}
                                    width={36}
                                    height={36}
                                    className={styles.commentAvatar}
                                />
                                <div className={styles.commentContent}>
                                    <p>
                                        <strong>{comment.from.username}</strong>
                                        {comment.content}
                                    </p>
                                    <small>{getTimeAgo(new Date(comment.createdAt))}</small>

                                    {/* Кнопка "View Answers" для комментариев с ответами */}
                                    {hasAnswers && !isExpanded && (
                                        <div className={styles.viewMore} onClick={() => toggleAnswers(comment.id)}>
                                            <p>View Answers</p>
                                        </div>
                                    )}

                                    {/* Отображение ответов на комментарий, если они открыты */}
                                    {isExpanded &&
                                        commentAnswer
                                            .filter(answer => answer.commentId === comment.id) // Фильтруем ответы по commentId
                                            .map(answer => (
                                                <div key={answer.id} className={styles.commentAnswer}>
                                                    <Image
                                                        src={answer.from.avatars[0]?.url || mokAva}
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
                            </div>
                        );
                    })}
                </div>

                <div className={styles.postInformation}>
                    <div className={styles.avatarsWhoLikes}>
                        {post.avatarWhoLikes.map((avatar, index) => (
                            <Image
                                key={index}
                                src={avatar}
                                alt={`User ${index}`}
                                width={1}
                                height={1}
                                className={styles.avatarWhoLikes}
                            />
                        ))}
                    </div>
                    <span className={styles.postLikes}>
                        {likesCount} <strong>"Like"</strong>
                    </span>
                </div>

                <div className={styles.postDate}>
                    <small>{getTimeAgo(new Date(post.createdAt))}</small>
                </div>
            </div>
        </>
    );
};
