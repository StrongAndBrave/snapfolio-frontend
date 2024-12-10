export type Post = {
    id: number;
    userName: string;
    description: string;
    location: string | null;
    images: [
        {
            url: string;
            width: number;
            height: number;
            fileSize: number;
            createdAt: Date;
            uploadId: string;
        },
    ];
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

export type UsersCount = {
    totalCount: number;
};
