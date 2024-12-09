import { SignUpFeature } from '@/features/sign-up';
import styles from './AuthWidget.module.scss';
import { RegistrationConfirmFeature } from '@/features/registration-confirm';

type Props = {
    type: 'sign-up' | 'sign-in' | 'forgot' | 'recovery' | 'registration-confirm';
};

export const AuthWidget = ({ type }: Props) => {
    return (
        <section className={styles.auth}>
            {type === 'sign-up' && <SignUpFeature />}
            {type === 'registration-confirm' && <RegistrationConfirmFeature />}
        </section>
    );
};
