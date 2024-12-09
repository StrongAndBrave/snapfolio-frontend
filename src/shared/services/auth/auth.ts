import { baseApi } from '@/shared/api/api';
import { Confirmation, EmailResending, Registration } from './types';

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
    }),
    overrideExisting: true,
});
