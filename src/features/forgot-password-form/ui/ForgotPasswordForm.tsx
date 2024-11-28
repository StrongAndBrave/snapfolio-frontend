'use client'
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import {Button, Input} from "@/shared/ui";
import styles from '@/shared/assets/styles/Form.module.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {ForgotPasswordData, forgotPasswordSchema} from "@/features/forgot-password-form/model/ForgotPasswordSchem";

export const ForgotPasswordForm = () => {
    const {register, handleSubmit, formState: { errors, isValid }} = useForm<ForgotPasswordData>({
        mode: "onTouched",
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(forgotPasswordSchema)
    })
    const onSubmit:SubmitHandler<ForgotPasswordData> = (data) => console.log(data)

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input type={'email'} label={'Email'} className={styles.field} error={errors.email && errors.email.message} {...register("email")}/>
            <span className={styles.helperText}>Enter your email address and we will send you further instructions</span>
            <Button disabled={!isValid} type={'submit'} variant={"contained"} fullWidth >Send Link</Button>
        </form>
    );
};
