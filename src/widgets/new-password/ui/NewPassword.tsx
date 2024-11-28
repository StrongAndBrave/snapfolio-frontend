import React from 'react';
import {FormLayout} from "@/shared/layouts/FormLayout";
import {NewPasswordForm} from "@/features/new-password-form";

export const NewPasswordWidget = () => {
    return (
        <FormLayout title={'Create New Password'}>
            <NewPasswordForm/>
        </FormLayout>
    );
};
