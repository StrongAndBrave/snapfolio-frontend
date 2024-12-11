'use client';
import { RegistredUsers } from '@/entities/registred-users';
import { authApi } from '@/shared/services/auth/auth';

export const Home = () => {
    const { data: userInfo, isLoading, error } = authApi.useGetUserInfoQuery();

    return (
        <>
            <RegistredUsers />
            {isLoading && <p style={{ padding: '30px' }}>Loading...</p>}
            {error && <p style={{ padding: '30px' }}>Error loading user info</p>}
            {userInfo && <p style={{ padding: '30px' }}>{JSON.stringify(userInfo)}</p>}
        </>
    );
};
