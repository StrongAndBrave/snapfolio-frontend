import React from 'react';
import {FormLayout} from "@/shared/layouts/FormLayout";
import styles from '@/shared/assets/styles/Form.module.scss'
import {ForgotPasswordForm} from "@/features/forgot-password-form";
import Link from "next/link";
import {Button} from "@/shared/ui";

export const ForgotPasswordWidget = () => {
    return (
        <FormLayout title={'Forgot Password'}>
            <ForgotPasswordForm/>
            <Button as={Link} href={'/sign-in'} variant={"text"} className={styles.linkMT30} >Sign In</Button>
        </FormLayout>
    );
};
