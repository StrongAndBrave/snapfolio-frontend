import { useGetPublicUserProfileQuery } from '@/features/posts/api/postsApi';

export const useProfileData = (userName: string) => {
    return useGetPublicUserProfileQuery(userName);
};
