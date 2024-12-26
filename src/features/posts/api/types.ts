type Image = {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string; // ISO 8601 format
    uploadId: string;
};

type Owner = {
    firstName: string;
    lastName: string;
};

type Item = {
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

type ResponseData = {
    pageSize: number;
    totalCount: number;
    notReadCount: number;
    items: Item[];
};

interface GetPostsQueryParams {
    userName: string;
    pageSize: number;
    pageNumber: number;
    sortBy: string;
    sortDirection: 'asc' | 'desc';
}

type ChildMetadata = {
    uploadId: string;
};

type CreatePostMutationParams = {
    description: string;
    childrenMetadata: ChildMetadata[];
};

interface ImageUploadRequest {
    files: File[];
}

interface ImageInfo {
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
    uploadId: string;
}

interface ImageUploadResponse {
    images: ImageInfo[];
}
