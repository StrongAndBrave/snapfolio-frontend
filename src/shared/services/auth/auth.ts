import { baseApi } from '@/shared/api/api';
import {
    Confirmation,
    EmailResending,
    LoginDataRequest,
    LoginDataResponse,
    NewPassword,
    PasswordRecovery,
    Registration,
    TokensResponse,
    UserInfo,
} from './types';

export const authApi = baseApi.injectEndpoints({
    endpoints: create => ({
        postRegistration: create.mutation<void, Registration>({
            query: body => ({
                url: '/auth/registration',
                method: 'POST',
                body,
            }),
        }),
        postRegistrationConfirmation: create.mutation<void, Confirmation>({
            query: body => ({
                url: '/auth/registration-confirmation',
                method: 'POST',
                body,
            }),
        }),
        postEmailResending: create.mutation<void, EmailResending>({
            query: body => ({
                url: '/auth/registration-email-resending',
                method: 'POST',
                body,
            }),
        }),
        postLoginData: create.mutation<LoginDataResponse, LoginDataRequest>({
            query: body => ({
                url: '/auth/login',
                method: 'POST',
                credentials: 'include',
                body,
            }),
        }),
        postPasswordRecovery: create.mutation<void, PasswordRecovery>({
            query: body => ({
                url: '/auth/password-recovery',
                method: 'POST',
                credentials: 'include',
                body,
            }),
        }),
        postNewPassword: create.mutation<void, NewPassword>({
            query: body => ({
                url: '/auth/new-password',
                method: 'POST',
                credentials: 'include',
                body,
            }),
        }),
        postLogout: create.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                credentials: 'include',
            }),
        }),
        getUserInfo: create.query<UserInfo, void>({
            query: () => {
                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('accessToken');
                    return {
                        url: '/auth/me',
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json',
                        },
                        credentials: 'include',
                    };
                }
                return {
                    url: '',
                    method: 'GET',
                    headers: {},
                    credentials: 'include',
                };
            },
        }),
        updateTokens: create.mutation<TokensResponse, void>({
            query: () => {
                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('accessToken');
                    return {
                        url: '/auth/update-tokens',
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json',
                        },
                        credentials: 'include',
                    };
                }
                return {
                    url: '',
                    method: 'POST',
                    headers: {},
                    credentials: 'include',
                };
            },
        }),
    }),
    overrideExisting: true,
});
