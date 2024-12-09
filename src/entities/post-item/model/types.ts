export type ImgPost = {
    createdAt: Date;
    fileSize: number;
    height: number;
    uploadId: string;
    url: string;
    width: number;
};

export type Post = {
    id: number;
    userName: string;
    description: string;
    location: string | null;
    images: ImgPost[];
    createdAt: Date;
    updatedAt: Date;
    ownerId: number;
    avatarOwner: string;
    owner: {
        firstName: string;
        lastName: string;
    };
    likesCount: number;
    isLiked: boolean;
    avatarWhoLikes: boolean; // []
};

export type Posts = {
    totalCount: number;
    pageSize: number;
    items: Post[];
    totalUsers: number;
};

export type PublicationsFollowers = {
    totalCount: number;
    pagesCount: number;
    page: number;
    pageSize: number;
    prevCursor: number;
    nextCursor: number;
    items: Post[];
};
