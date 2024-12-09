import React from 'react';
import { NewPasswordWidget } from '@/widgets/new-password';
import { FormLayout } from '@/features/auth/ui/FormLayout';
import { NewPasswordForm } from '@/features/auth';

export const NewPassword = () => {
    return (
        <FormLayout title={'Create New Password'}>
            <NewPasswordForm />
        </FormLayout>
    );
};
