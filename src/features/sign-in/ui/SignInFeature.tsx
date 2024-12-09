'use client';
import { Button, Input, Password } from '@/shared/ui';
import styles from './SignInFeature.module.scss';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFieldsSchema, TLoginFieldsSchema } from '@/shared/shemas/forms';
import { authApi } from '@/shared/services/auth/auth';
import { useRouter } from 'next/navigation';
import { AuthFormLayout } from '@/widgets/layouts/auth-form-layout';

export const SignInFeature = () => {
    const [postLogin, { isLoading }] = authApi.usePostLoginDataMutation();
    const router = useRouter();

    const form = useForm<TLoginFieldsSchema>({
        resolver: zodResolver(loginFieldsSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
        // по ТЗ - mode: 'onBlur',
        // reValidateMode: 'onChange',
    });

    const {
        formState: { errors, isValid },
        setError,
    } = form;

    const onSubmit = async (data: TLoginFieldsSchema) => {
        const response = await postLogin({
            email: data.email,
            password: data.password,
        });
        if (response.data) {
            localStorage.setItem('accessToken', response.data.accessToken);
            router.push('/');
        } else {
            setError('password', {
                type: 'manual',
                message: 'The email or password are incorrect. Try again please',
            });
        }
    };

    return (
        <AuthFormLayout
            title={'Sign In'}
            text={'Don’t have an account?'}
            alternativeBtn={'Sign Up'}
            hrefAltBtn={'/auth/sign-up'}
        >
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.inputs}>
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Epam@epam.com"
                            {...form.register('email')}
                            error={errors.email?.message}
                        />
                        <Password
                            label="Password"
                            placeholder="**********"
                            {...form.register('password')}
                            error={errors.password?.message}
                        />
                    </div>
                    <Link href={'/auth/forgot-password'} className={styles.forgot}>
                        Forgot Password
                    </Link>
                    <div className={styles['btn-wrapper']}>
                        <Button variant="contained" fullWidth type="submit" disabled={isLoading || !isValid}>
                            Sign In
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </AuthFormLayout>
    );
};
