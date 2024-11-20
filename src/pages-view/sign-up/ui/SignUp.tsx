'use client';

import { Button, Checkbox, Input, Password } from '@/shared/ui';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './SignUp.module.scss';
import { useState } from 'react';
import { Modal } from '@/features/modal';

// import dynamic from 'next/dynamic';

// const Input = dynamic(() => import('@/shared/ui/input/Input'), { ssr: false });

type Inputs = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    checkbox: boolean;
};

const schema: ZodType<Inputs> = z
    .object({
        username: z
            .string()
            .min(6, { message: 'Minimum number of characters 6' })
            .max(30, { message: 'Maximum number of characters 30' })
            .regex(/^[0-9A-Za-z_-]+$/, { message: 'Incorrect value for username' }),
        email: z.string().email({
            message: 'The email must match the format \n' + 'example@example.com',
        }),
        password: z
            .string()
            .min(6, { message: 'Minimum number of characters 6' })
            .max(20, { message: 'Maximum number of characters 20' })
            .regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]).{8,}$/, {
                message:
                    'Password must contain 0-9, a-z, A-Z, ! " \n' +
                    "# $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ \n" +
                    '_` { | } ~',
            }),
        passwordConfirm: z.string(),
        checkbox: z.literal(true),
    })
    .required()
    .refine(data => data.password === data.passwordConfirm, {
        message: 'Passwords must match',
        path: ['passwordConfirm'],
    });

export const SignUp = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [emailData, setEmailData] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({ mode: 'onBlur', resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
        setEmailData(data.email);
        setIsOpenModal(true);
        reset();
    };

    const onModalClose = () => {
        setIsOpenModal(false);
    };

    const isSubmitBtnDisabled = !!Object.keys(errors).length;

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <div className={styles.header}>
                    <h1>Sign Up</h1>
                    <div className={styles['buttons-wrapper']}>
                        <button>
                            <Image src={'/svg/google.svg'} width={36} height={36} alt={'google logo'} />
                        </button>
                        <button>
                            <Image src={'/svg/github.svg'} width={36} height={36} alt={'github logo'} />
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type={'text'}
                        label={'Username'}
                        {...register('username')}
                        error={errors.username?.message}
                    />
                    <Input type={'email'} label={'Email'} {...register('email')} error={errors.email?.message} />
                    <Password label={'Password'} {...register('password')} error={errors.password?.message} />
                    <Password
                        label={'Password confirmation'}
                        {...register('passwordConfirm')}
                        error={errors.passwordConfirm?.message}
                    />
                    <Checkbox {...register('checkbox')}>
                        I agree to the <Link href={'/terms-service'}>Terms of Service</Link> and{' '}
                        <Link href={'/privacy-policy'}>Privacy Policy</Link>
                    </Checkbox>
                    <Button
                        variant={'contained'}
                        type={'submit'}
                        className={styles.submit}
                        fullWidth
                        disabled={isSubmitBtnDisabled}
                    >
                        Sign Up
                    </Button>
                </form>
                <div className={styles.footer}>
                    <p>Do you have an account?</p>
                    <Button variant={'text'} as={Link} href={'/sign-in'} fullWidth>
                        Sign In
                    </Button>
                </div>
            </div>

            {/* modal window */}
            {isOpenModal && (
                <Modal onClose={onModalClose} title={'Email sent'}>
                    <div className={styles['modal-content']}>
                        <p>We have sent a link to confirm your email to {emailData || 'epam@epam.com'}</p>
                        <Button variant={'contained'} onClick={onModalClose} className={styles['modal-button']}>
                            OK
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};
