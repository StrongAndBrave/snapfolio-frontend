import { baseApi } from '@/shared/api/api';
import { Posts, UsersCount } from './types';

export const postsApi = baseApi.injectEndpoints({
    endpoints: create => ({
        getPosts: create.query<Posts, void>({
            query: () => '/public-posts/all',
        }),
        getPublications: create.query<Posts, void>({
            query: () => '/home/publications-followers',
        }),
        getTotalCountUsers: create.query<UsersCount, void>({
            query: () => '/public-user',
        }),
    }),
    overrideExisting: true,
});

// export const {useGetPostsQuery} = postsApi;
