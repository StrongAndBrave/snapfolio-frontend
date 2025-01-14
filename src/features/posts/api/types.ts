// export type ImageUploadResponse = {
//     images: Image[];
// };

// export type GetCommentsWithPaginationResponse = {
//     pageSize: number;
//     totalCount: number;
//     notReadCount: number;
//     items: CommentType[];
// };

// export type CommentType = {
//     id: number;
//     postId: number;
//     from: {
//         id: number;
//         username: string;
//         avatars: [{}];
//     };
//     content: string;
//     createdAt: string;
//     answerCount: number;
//     likeCount: number;
//     isLiked: true;
// };

// export type AnswerType = Omit<CommentType, 'answerCount'>;

// export type GetAnswersWithPaginationResponse = {
//     pageSize: number;
//     totalCount: number;
//     notReadCount: number;
//     items: AnswerType[];
// };

// requests

type GetPostWithPaginationRequest = {
    postId: number;
    pageSize: number;
    pageNumber: number;
    sortBy: string;
    sortDirection: 'asc' | 'desc';
};

type GetLikesRequest = {
    postId: number;
    search: string;
    pageSize: number;
    pageNumber: number;
    cursor: number;
};

type GetCommentLikesRequest = GetLikesRequest | { commentId: number };

export type CreatePostRequest = {
    description: string;
    childrenMetadata: ChildMetaData[];
};

export type ImageUploadRequest = {
    files: File[];
};

export type UpdatePostByIdRequest = {
    postId: number;
    description: string;
};

export type GetCommentsWithPaginationRequest = GetPostWithPaginationRequest;

export type GetAnswersWithPaginationRequest = GetPostWithPaginationRequest | { commentId: number };

export type GetAnswerLikesRequest = GetCommentLikesRequest | { answerId: number };

export type GetCommentLikes = GetCommentLikesRequest;

export type UpdateLikeStatusPostRequest = {
    postId: number;
    likeStatus: string;
};

export type GetPostLikesRequest = GetLikesRequest;

export type GetPostsWithPaginationByUsernameRequest = Omit<GetPostLikesRequest, 'postId'> | { userName: string };

// common

type ChildMetaData = {
    uploadId: string;
};

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

//responses
