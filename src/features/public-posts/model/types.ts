// for posts
export type Post = {
    id: number;
    userName: string;
    description: string;
    location: string | null;
    images: {
        url: string;
        width: number;
        height: number;
        fileSize: number;
        createdAt: string;
        uploadId: string;
    }[];
    createdAt: string;
    updatedAt: string;
    avatarOwner: string;
    ownerId: number;
    owner: {
        firstName: string | null;
        lastName: string | null;
    };
    likesCount: number;
    isLiked: boolean;
    avatarWhoLikes: string[];
};

export type AllPosts = {
    totalCount: number;
    pageSize: number;
    totalUsers: number;
    items: Post[];
};

// for profile
export type UserProfile = {
    id: number;
    userName: string;
    aboutMe: string | null;
    avatars: string[];
    userMetadata: {
        following: number;
        followers: number;
        publications: number;
    };
};
// for comments
type Avatar = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
};

type User = {
    id: number;
    username: string;
    avatars: Avatar[];
};

type BaseComment<T> = {
    id: number;
    from: User;
    content: string;
    createdAt: string;
    likeCount: number;
    isLiked: boolean;
} & T;

export type Comment = BaseComment<{
    postId: number;
    answerCount: number;
}>;

export type CommentAnswer = BaseComment<{
    commentId: number;
}>;

// type CommentsResponse = {
//     totalCount: number;
//     pagesCount: number;
//     page: number;
//     pageSize: number;
//     items: Comment[];
// };
//
// type CommentsList = {
//     comments: Comment[];
// };
