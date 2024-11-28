'use client'
import React, {useState} from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import {Button, Checkbox, Input, Modal, Password} from "@/shared/ui";
import Link from "next/link";
import styles from '@/shared/assets/styles/Form.module.scss'
import {zodResolver} from "@hookform/resolvers/zod";
import {SignUpData, signUpSchema} from "@/features/sign-up-form/model/SignUpSchem";

export const SignUpForm = () => {
    const {register, handleSubmit, formState: { errors, isValid }, reset} = useForm<SignUpData>({
        mode: "onTouched",
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            checkBox: true,
        },
        resolver: zodResolver(signUpSchema)
    })

    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState<string | null>(null);

    const onSubmit:SubmitHandler<SignUpData> = (data) => {
        console.log(data)
        setEmail(data.email);
        setIsOpen(true);
        // reset();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input type={'text'} label={'Username'} className={styles.field} error={errors.userName && errors.userName.message} {...register("userName")}/>
            <Input type={'email'} label={'Email'} className={styles.field} error={errors.email && errors.email.message} {...register("email")}/>
            <Password label={'Password'} className={styles.field} error={errors.password && errors.password.message} {...register("password")}/>
            <Password label={'Password confirmation'} className={styles.field} error={errors.passwordConfirmation && errors.passwordConfirmation.message} {...register("passwordConfirmation")}/>

            <div className={styles.legal}>
                <Checkbox {...register("checkBox")}/>
                <span>I agree to the <Link  href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link></span>
            </div>
            {/*<button onClick={() => setIsOpen(()=> true)}>Modal</button>*/}
            <Button disabled={!isValid} type={'submit'} variant={"contained"} fullWidth >Sign Up</Button>

            <Modal isOpen={isOpen} title={'Email sent'} onClose={() => setIsOpen(()=>false)}>
                <div className={styles.modalInfo}>
                    <span>We have sent a link to confirm your email to {email}</span>
                    <Button variant={"contained"} onClick={() => setIsOpen(()=>false)}>OK</Button>
                </div>
            </Modal>
        </form>
    );
};