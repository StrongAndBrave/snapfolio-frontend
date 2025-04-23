import { baseApi } from '@/shared/api/baseApi';
import { UserProfile } from '@/features/profile/api/types';

export const profileApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query<UserProfile, void>({
            query: () => ({
                url: `/api/v1/users/profile`,
            }),
        }),
    }),
});

export const { useGetProfileQuery } = profileApi;
