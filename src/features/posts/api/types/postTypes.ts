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

export type UpdateLikeStatusPostRequest = {
    postId: number;
    likeStatus: string;
};

export type GetPostLikesRequest = GetLikesRequest;

export type GetPostsByUsernameRequest = PaginationRequest &
    SortRequest & {
        userName: string;
    };

export type GetAllPostsRequest = {
    endCursorPostId: number;
    pageSize: number;
} & SortRequest;

export type GetPostsByUserIdRequest = { userId: number } & GetAllPostsRequest;

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

type Avatar = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
};

export type User = {
    id: number;
    userId: number;
    userName: string;
    createdAt: string;
    avatars: Avatar[];
    isFollowing: boolean;
    isFollowedBy: boolean;
};

export type GetLikesResponse = {
    pageSize: number;
    totalCount: number;
    notReadCount: number;
    items: User[];
};

type UserMetadata = {
    following: number;
    followers: number;
    publications: number;
};

export type PublicProfile = {
    id: number;
    userName: string;
    aboutMe: string;
    avatars: Avatar[];
    userMetadata: UserMetadata;
    hasPaymentSubscription: boolean;
};

// responses

export type ResponseCountRegisteredUsers = {
    totalCount: number;
};

export type ImageUploadResponse = {
    images: Image[];
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
