import React from 'react';
import styles from '@/shared/assets/styles/Form.module.scss'
import {SocialAuth} from "@/features/social-auth";
import {SignUpForm} from "@/features/sign-up-form";
import {FormLayout} from "@/shared/layouts/FormLayout";
import Link from "next/link";
import {Button} from "@/shared/ui";

export const SignUpWidget = () => {
    return (
        <FormLayout title={'Sign Up'}>
            <SocialAuth/>
            <SignUpForm/>
            <span className={styles.text}>Do you have an account?</span>
            <Button as={Link} href={'/sign-in'} variant={"text"} className={styles.link} >Sign In</Button>
        </FormLayout>
    );
};
