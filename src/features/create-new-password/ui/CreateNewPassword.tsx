'use client';
import dynamic from 'next/dynamic';

import { Button, Password } from '@/shared/ui';
import { AuthFormLayout } from '@/widgets/layouts/auth-form-layout';
import styles from './CreateNewPassword.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formRecoveryPasswordSchema, TRecoveryPasswordSchema } from '@/shared/shemas/forms';
import { authApi } from '@/shared/services/auth/auth';
import { useSearchParams } from 'next/navigation';
import { Modal } from '@/shared/ui/modal';
import Image from 'next/image';
import congirmSvg from '../../../../public/auth/confirm-email@2x.png';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const CreateNewPasswordInner = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [postPasswordRecovery, { isError, isSuccess, isLoading: loadingPost }] = authApi.usePostNewPasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(true);
        }
    }, [isSuccess]);

    const form = useForm<TRecoveryPasswordSchema>({
        resolver: zodResolver(formRecoveryPasswordSchema),
        defaultValues: {
            password: '',
            confirm_password: '',
        },
        mode: 'onChange',
        // mode: 'onBlur',
        // reValidateMode: 'onChange',
    });

    const {
        formState: { errors, isValid, isLoading },
    } = form;

    const onSubmit = async (data: TRecoveryPasswordSchema) => {
        await postPasswordRecovery({
            newPassword: data.password,
            recoveryCode: code as string,
        });
    };

    const handleModalClose = () => {
        setIsModalOpen(prev => !prev);
    };

    if (isError) {
        return (
            <section className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Email verification link expired</h1>
                    <p className={styles.text}>
                        Looks like the verification link has expired. Not to worry, we can send the link again.
                    </p>
                    <form>
                        <div className={styles.btn}>
                            <Button variant="contained" as={Link} href="/auth/forgot-password">
                                Resend link
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={styles.img}>
                    <Image src={congirmSvg} alt="Your email confirmed" width={473} height={352} />
                </div>
            </section>
        );
    }

    return (
        <>
            <AuthFormLayout title="Create New Password" className="forgot">
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                        <div>
                            <Password
                                label="New password"
                                {...form.register('password')}
                                error={errors.password?.message}
                            />
                            <Password
                                label="Password confirmation"
                                {...form.register('confirm_password')}
                                error={errors.confirm_password?.message}
                            />
                            <span className={styles.notion}>Your password must be between 6 and 20 characters</span>
                        </div>
                        <div className={styles.btns}>
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                disabled={isLoading || !isValid || loadingPost}
                            >
                                Create new password
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </AuthFormLayout>
            <Modal selector="modal-root" header="Email sent" show={isModalOpen} onClose={handleModalClose}>
                <>
                    <p style={{ marginBottom: '18px' }}>Your new password successfully created</p>
                    <Button
                        style={{ marginLeft: 'auto', display: 'block' }}
                        variant="contained"
                        as={Link}
                        href="/auth/sign-in"
                    >
                        Sign In
                    </Button>
                </>
            </Modal>
        </>
    );
};

export const CreateNewPassword = dynamic(() => Promise.resolve(CreateNewPasswordInner), {
    ssr: false,
});
