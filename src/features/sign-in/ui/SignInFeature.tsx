'use client';
import dynamic from 'next/dynamic';

import { Button, Input, Password } from '@/shared/ui';
import styles from './SignInFeature.module.scss';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFieldsSchema, TLoginFieldsSchema } from '@/shared/shemas/forms';
import { authApi } from '@/shared/services/auth/auth';
import { useRouter } from 'next/navigation';
import { AuthFormLayout } from '@/widgets/layouts/auth-form-layout';
import { useDispatch } from 'react-redux';
import { login } from '@/shared/store/authSlice';

const SignInFeatureInner = () => {
    const [postLogin, { isLoading }] = authApi.usePostLoginDataMutation();
    const router = useRouter();
    const dispatch = useDispatch();

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
            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', response.data.accessToken);
            }
            dispatch(login());
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

export const SignInFeature = dynamic(() => Promise.resolve(SignInFeatureInner), {
    ssr: false,
});
