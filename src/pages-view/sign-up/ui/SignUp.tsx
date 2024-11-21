"use client"
import React from 'react';
import {Button} from "@/shared/ui";
import {SignUpForm} from "@/pages-view/sign-up/ui/SignUpForm";
import styles from './SignUp.module.scss'

export const SignUp = () => {



    return (
        <section className={styles.signUp}>
            <span className={styles.title}>Sign Up</span>
            <div className={styles.authButtons}>
                <Button>g</Button>
                <Button>g</Button>
            </div>
            <SignUpForm/>
            <span className={styles.text}>Do you have an account?</span>
            <Button variant={"text"}>Sign In</Button>
        </section>
    );
};
