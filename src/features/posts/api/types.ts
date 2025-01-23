// requests

type PaginationRequest = {
    pageSize: number;
    pageNumber: number;
};

type SortRequest = {
    sortBy: string;
    sortDirection: 'asc' | 'desc';
};

type GetPostRequest = PaginationRequest &
    SortRequest & {
        postId: number;
    };

type GetLikesRequest = PaginationRequest & {
    postId: number;
    search: string;
    cursor: number;
};

export type GetCommentLikesRequest = GetLikesRequest & { commentId: number };

export type CreatePostRequest = {
    description: string;
    childrenMetadata: {
        uploadId: string;
    }[];
};

export type ImageUploadRequest = {
    files: File[];
};

export type UpdatePostByIdRequest = {
    postId: number;
    description: string;
};

export type GetCommentsRequest = GetPostRequest;

export type GetAnswersRequest = GetPostRequest & { commentId: number };

export type GetAnswerLikesRequest = GetCommentLikesRequest & { answerId: number };

export type GetCommentLikes = GetCommentLikesRequest;

export type UpdateLikeStatusPostRequest = {
    postId: number;
    likeStatus: string;
};

export type GetPostLikesRequest = GetLikesRequest;

export type GetPostsByUsernameRequest = PaginationRequest &
    SortRequest & {
        userName: string;
    };

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

export type GetAllPostsRequest = {
    endCursorPostId: number;
    pageSize: number;
} & SortRequest;

export type GetPostsByUserIdRequest = { userId: number } & GetAllPostsRequest;

export type GetCommentsForUnauthorizedUsersRequest = {
    postId: number;
} & SortRequest &
    PaginationRequest;

//responses

export type CreatePostResponse = PostType;

export type GetPostByIdResponse = PostType;

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

export type GetPostsByUsernameResponse = {
    pageSize: number;
    totalCount: number;
    notReadCount: number;
    items: PostType[];
};

export type GetAllPostsResponse = {
    totalCount: number;
    pageSize: number;
    totalUsers: number;
    items: PostType[];
};

export type GetPostsByUserIdResponse = {
    totalCount: number;
    pageSize: number;
    totalUsers: number;
    items: PostType[];
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

type Owner = {
    firstName: string;
    lastName: string;
};

export type PostType = {
    id: number;
    userName: string;
    description: string;
    location: string;
    images: Image[];
    createdAt: string;
    updatedAt: string;
    ownerId: number;
    avatarOwner: string;
    owner: Owner;
    likesCount: number;
    isLiked: boolean;
    avatarWhoLikes: boolean;
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
