import React from 'react';
import styles from '@/shared/assets/styles/Form.module.scss'
import {SocialAuth} from "@/features/social-auth";
import {FormLayout} from "@/shared/layouts/FormLayout";
import {SignInForm} from "@/features/sign-in-form";
import Link from "next/link";
import {Button} from "@/shared/ui";

export const SignInWidget = () => {
    return (
        <FormLayout title={'Sign In'}>
            <SocialAuth/>
            <SignInForm/>
            <span className={styles.text}>Do you have an account?</span>
            <Button as={Link} href={'/sign-up'} variant={"text"} className={styles.link} >Sign In</Button>
        </FormLayout>
    );
};
