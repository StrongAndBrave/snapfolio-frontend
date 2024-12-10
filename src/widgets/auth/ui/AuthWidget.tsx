import { SignUpFeature } from '@/features/sign-up';
import styles from './AuthWidget.module.scss';
import { RegistrationConfirmFeature } from '@/features/registration-confirm';
import { SignInFeature } from '@/features/sign-in';
import { ForgotPasswordFeature } from '@/features/forgot-password-feature';
import { CreateNewPassword } from '@/features/create-new-password';
import { Suspense } from 'react';

type Props = {
    type: 'sign-up' | 'sign-in' | 'forgot' | 'recovery' | 'registration-confirm';
};

export const AuthWidget = ({ type }: Props) => {
    return (
        <section className={styles.auth}>
            {type === 'sign-up' && <SignUpFeature />}
            {type === 'registration-confirm' && (
                <Suspense fallback={<div>Loading...</div>}>
                    <RegistrationConfirmFeature />
                </Suspense>
            )}
            {type === 'sign-in' && <SignInFeature />}
            {type === 'forgot' && <ForgotPasswordFeature />}
            {type === 'recovery' && <CreateNewPassword />}
        </section>
    );
};
