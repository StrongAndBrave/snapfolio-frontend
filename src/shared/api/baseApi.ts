import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/shared/api/baseQueryWithReauth';
import { UserProfile } from '@/features/public-posts/model';
import { mockProfiles } from '@/features/public-posts/api/mockProfiles';

// было до моих изменений с главной страницей
// export const baseApi = createApi({
//     reducerPath: 'inctagramApi',
//     baseQuery: baseQueryWithReauth,
//     endpoints: () => ({}),
//     tagTypes: [],
// });

export const baseApi = createApi({
    reducerPath: 'inctagramApi',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        // Реальный endpoint для получения профиля
        getUserProfile: builder.query<UserProfile, string>({
            query: profileId => `/public-user/profile/${profileId}`,
        }),
        // Моковый endpoint для разработки
        getMockUserProfile: builder.query<UserProfile, string>({
            queryFn: profileId => {
                const profile = mockProfiles[profileId];

                if (profile) {
                    return { data: profile };
                } else {
                    return { error: { status: 404, data: { message: 'Profile not found' } } };
                }
            },
        }),
    }),
    tagTypes: [],
});

export const { useGetUserProfileQuery, useGetMockUserProfileQuery } = baseApi;
