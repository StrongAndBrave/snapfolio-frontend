import { SignUpPayload } from '@/features/auth/model/SignUpSchem';
import { baseApi } from '@/shared/api/baseApi';
import { SignInData } from '@/features/auth/model/SignInSchem';
import { ForgotPasswordData } from '@/features/auth/model/ForgotPasswordSchem';
import {setCredentials} from "@/app/store/authSlice";

export const authApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        signUp: builder.mutation<void, SignUpPayload>({
            query: SignUpPayload => ({
                method: 'POST',
                url: `/api/v1/auth/registration`,
                body: { ...SignUpPayload, baseUrl: 'http://localhost:3000' },
            }),
        }),
        signUpConfirmation: builder.mutation<void, { code: string }>({
            query: ({ code }) => ({
                url: '/api/v1/auth/registration-confirmation',
                method: 'POST',
                body: { confirmationCode: code },
            }),
        }),
        resendSignUpLink: builder.mutation<void, { email: string }>({
            query: ({ email }) => ({
                url: '/api/v1/auth/registration-email-resending',
                method: 'POST',
                body: { email, baseUrl: 'http://localhost:3000' },
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
                    const {data} = await queryFulfilled;

                    localStorage.setItem('accessToken', data.accessToken);

                    dispatch(setCredentials({accessToken: data.accessToken}));

                } catch (error) {
                    console.error('Login failed:', error);
                }
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                method: 'POST',
                url: `/api/v1/auth/logout`,
            }),
        }),
        me: builder.query<unknown, void>({
            query: () => ({
                url: `/api/v1/auth/me`,
            }),
        }),
        passwordRecovery: builder.mutation<void, ForgotPasswordData>({
            query: ForgotPasswordData => ({
                method: 'POST',
                url: `/api/v1/auth/password-recovery`,
                body: { ...ForgotPasswordData, baseUrl: 'http://localhost:3000' },
            }),
        }),
        checkRecoveryCode: builder.mutation<void, string>({
            query: recoveryCode => ({
                method: 'POST',
                url: `/api/v1/auth/check-recovery-code`,
                body: { recoveryCode },
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
                url: `/api/v1/auth/github/login?redirect_url=http://localhost:3000`,
            }),
        }),
        googleAuth: builder.mutation<void, undefined>({
            query: () => ({
                method: 'POST',
                url: `/api/v1/auth/google/login?redirect_url=http://localhost:3000`,
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
    useLazyMeQuery,
    useLogoutMutation
} = authApi;
