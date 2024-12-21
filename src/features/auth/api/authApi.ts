import { SignUpPayload } from '@/features/auth/model/SignUpSchem';
import { baseApi } from '@/shared/api/baseApi';
import { SignInData } from '@/features/auth/model/SignInSchem';
import { ForgotPasswordData } from '@/features/auth/model/ForgotPasswordSchem';
import { login, logout } from '@/features/auth/model/authSlice';
import { MeResponse } from '@/features/auth/api/types';

export const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        signUp: builder.mutation<void, SignUpPayload>({
            query: SignUpPayload => ({
                method: 'POST',
                url: `/api/v1/auth/registration`,
                body: { ...SignUpPayload, baseUrl: process.env.NEXT_PUBLIC_API_URL },
            }),
        }),
        signUpConfirmation: builder.mutation<void, { confirmationCode: string }>({
            query: confirmationCode => ({
                url: '/api/v1/auth/registration-confirmation',
                method: 'POST',
                body: confirmationCode,
            }),
        }),
        resendSignUpLink: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: '/api/v1/auth/registration-email-resending',
                method: 'POST',
                body: { email, baseUrl: process.env.NEXT_PUBLIC_API_URL },
            }),
        }),
        signIn: builder.mutation<{ accessToken: string }, SignInData>({
            query: SignInData => ({
                method: 'POST',
                url: `/api/v1/auth/login`,
                body: SignInData,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('accessToken', data.accessToken);
                    dispatch(login());
                } catch (error) {
                    console.error('Login failed:', error);
                }
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                method: 'POST',
                url: `/api/v1/auth/logout`,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logout());
                    localStorage.removeItem('accessToken');
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            },
        }),
        me: builder.query<MeResponse, void>({
            query: () => ({
                url: `/api/v1/auth/me`,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(login());
                } catch (error) {
                    console.error('Me failed:', error);
                }
            },
        }),
        passwordRecovery: builder.mutation<void, ForgotPasswordData>({
            query: ForgotPasswordData => ({
                method: 'POST',
                url: `/api/v1/auth/password-recovery`,
                body: { ...ForgotPasswordData, baseUrl: process.env.NEXT_PUBLIC_API_URL },
            }),
        }),
        checkRecoveryCode: builder.mutation<void, { recoveryCode: string }>({
            query: recoveryCode => ({
                method: 'POST',
                url: `/api/v1/auth/check-recovery-code`,
                body: recoveryCode,
            }),
        }),
        newPassword: builder.mutation<void, { newPassword: string; recoveryCode: string }>({
            query: ({ newPassword, recoveryCode }) => ({
                method: 'POST',
                url: `/api/v1/auth/new-password`,
                body: { newPassword, recoveryCode },
            }),
        }),
        githubAuth: builder.query<void, void>({
            query: () => ({
                url: `/api/v1/auth/github/login?redirect_url=${process.env.NEXT_PUBLIC_API_URL}`,
            }),
        }),
        googleAuth: builder.mutation<void, undefined>({
            query: () => ({
                method: 'POST',
                url: `/api/v1/auth/google/login?redirect_url=${process.env.NEXT_PUBLIC_API_URL}`,
                body: {
                    redirectUrl: 'string',
                    code: 'string',
                },
            }),
        }),
    }),
});

export const {
    useSignUpMutation,
    useResendSignUpLinkMutation,
    useSignUpConfirmationMutation,
    useSignInMutation,
    usePasswordRecoveryMutation,
    useCheckRecoveryCodeMutation,
    useNewPasswordMutation,
    useLazyGithubAuthQuery,
    useMeQuery,
    useLogoutMutation,
} = authApi;
