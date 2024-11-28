'use client'
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import {Button, Password} from "@/shared/ui";
import styles from '@/shared/assets/styles/Form.module.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {NewPasswordData, newPasswordSchema} from "@/features/new-password-form/model/NewPasswordSchem";

export const NewPasswordForm = () => {
    const {register, handleSubmit, formState: { errors, isValid }} = useForm<NewPasswordData>({
        mode: "onTouched",
        defaultValues: {
            password: "",
            passwordConfirmation: "",
        },
        resolver: zodResolver(newPasswordSchema)
    })
    const onSubmit:SubmitHandler<NewPasswordData> = (data) => console.log(data)

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Password label={'Password'} className={styles.field} error={errors.password && errors.password.message} {...register("password")}/>
            <Password label={'Password confirmation'} className={styles.field} error={errors.passwordConfirmation && errors.passwordConfirmation.message} {...register("passwordConfirmation")}/>
            <span className={`${styles.helperText} ${styles.mb40}`}>Your password must be between 6 and 20 characters</span>
            <Button disabled={!isValid} type={'submit'} variant={"contained"} fullWidth >Create new password</Button>
        </form>
    );
};