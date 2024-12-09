import { baseApi } from '@/shared/api/api';
import {
    Confirmation,
    EmailResending,
    LoginDataRequest,
    LoginDataResponse,
    NewPassword,
    PasswordRecovery,
    Registration,
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
                body: body,
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
    }),
    overrideExisting: true,
});
