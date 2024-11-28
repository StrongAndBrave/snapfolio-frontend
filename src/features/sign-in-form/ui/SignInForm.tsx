'use client'
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import {Button, Input, Password} from "@/shared/ui";
import styles from '@/shared/assets/styles/Form.module.scss'
import Link from "next/link";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignInData, signInSchema} from "@/features/sign-in-form/model/SignInSchem";

export const SignInForm = () => {
    const {register, handleSubmit, formState: { errors, isValid }} = useForm<SignInData>({
        mode: "onTouched",
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(signInSchema)
    })
    const onSubmit:SubmitHandler<SignInData> = (data) => console.log(data)

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input type={'email'} label={'Email'} className={styles.field} error={errors.email && errors.email.message} {...register("email")}/>
            <Password label={'Password'} className={styles.field} error={errors.password && errors.password.message} {...register("password")}/>
            <Link className={styles.linkForgotPassword} href={'/forgot-password'}>Forgot password</Link>
            <Button disabled={!isValid} type={'submit'} variant={"contained"} fullWidth >Sign In</Button>
        </form>
    );
};