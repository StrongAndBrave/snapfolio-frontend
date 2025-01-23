// requests

type PaginationRequest = {
    pageSize: number;
    pageNumber: number;
};

type SortRequest = {
    sortBy: string;
    sortDirection: 'asc' | 'desc';
};

type GetLikesRequest = PaginationRequest & {
    postId: number;
    search: string;
    cursor: number;
};

export type GetCommentLikesRequest = GetLikesRequest & { commentId: number };

export type ImageUploadRequest = {
    files: File[];
};

export type GetCommentsRequest = PaginationRequest &
    SortRequest & {
        postId: number;
    };

export type GetAnswersRequest = PaginationRequest &
    SortRequest & {
        postId: number;
        commentId: number;
    };

export type GetAnswerLikesRequest = GetCommentLikesRequest & { answerId: number };

export type GetCommentLikes = GetCommentLikesRequest;

export type CreateCommentRequest = {
    postId: number;
    content: string;
};

export type CreateAnswerRequest = {
    postId: number;
    commentId: number;
    content: string;
};

export type UpdateLikeStatusAnswerRequest = {
    postId: number;
    commentId: number;
    answerId: number;
    likeStatus: string;
};

export type UpdateLikeStatusCommentRequest = {
    likeStatus: string;
    postId: number;
    commentId: number;
};

export type GetCommentsForUnauthorizedUsersRequest = {
    postId: number;
} & SortRequest &
    PaginationRequest;

//responses

export type ImageUploadResponse = {
    images: Image[];
};

export type GetCommentsResponse = {
    pageSize: number;
    totalCount: number;
    notReadCount: number;
    items: CommentType[];
};

export type GetAnswersResponse = {
    pageSize: number;
    totalCount: number;
    notReadCount: number;
    items: AnswerType[];
};

export type GetCommentsForUnauthorizedUsersResponse = {
    pageSize: number;
    totalCount: number;
    notReadCount: number;
    items: CommentType[];
};

// common

type Image = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
    uploadId: string;
};

export type CommentType = {
    id: number;
    postId: number;
    from: {
        id: number;
        username: string;
        avatars: object[];
    };
    content: string;
    createdAt: string;
    answerCount: number;
    likeCount: number;
    isLiked: boolean;
};

type Avatar = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
};

type User = {
    id: number;
    userId: number;
    userName: string;
    createdAt: string;
    avatars: Avatar[];
    isFollowing: boolean;
    isFollowedBy: boolean;
};

export type AnswerType = Omit<CommentType, 'answerCount'>;

export type GetLikesResponse = {
    pageSize: number;
    totalCount: number;
    notReadCount: number;
    items: User[];
};
