'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Password } from '@/shared/ui';
import styles from '@/features/auth/ui/Form.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordData, newPasswordSchema } from '@/features/auth/model/NewPasswordSchem';
import { useRouter, useSearchParams } from 'next/navigation';
import { useNewPasswordMutation } from '@/features/auth/api/authApi';

export const NewPasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
    } = useForm<NewPasswordData>({
        mode: 'onTouched',
        resolver: zodResolver(newPasswordSchema),
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const recoveryCode = searchParams.get('code');
    const [newPassword] = useNewPasswordMutation();

    const onSubmit: SubmitHandler<NewPasswordData> = formData => {
        if (recoveryCode) {
            const payload = {
                newPassword: formData.password,
                recoveryCode,
            };
            newPassword(payload)
                .unwrap()
                .then(() => {
                    router.push('/auth/sign-in');
                })
                .catch(err => {
                    err.data?.messages?.forEach((error: { field: keyof NewPasswordData; message: string }) => {
                        setError(error.field, { type: 'server', message: error.message });
                    });
                });
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Password
                label={'Password'}
                error={errors.password && errors.password.message}
                placeholder={'******************'}
                {...register('password')}
            />
            <Password
                label={'Password confirmation'}
                error={errors.passwordConfirmation && errors.passwordConfirmation.message}
                placeholder={'******************'}
                {...register('passwordConfirmation')}
            />
            <span className={`${styles.helperText} ${styles.mb40}`}>
                Your password must be between 6 and 20 characters
            </span>
            <Button disabled={!isValid} type={'submit'} variant={'contained'} fullWidth>
                Create new password
            </Button>
        </form>
    );
};
