import { Button } from '@/shared/ui';
import styles from './EmailVerified.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import confirmImg from '../../../../public/auth/confirm-email@2x.png';

export const EmailVerified = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Congratulations!</h1>
            <p className={styles.text}>Your email has been confirmed</p>
            <div className={styles.btn}>
                <Button as={Link} href="/auth/sign-in" variant="contained">
                    Sign in
                </Button>
            </div>
            <div className={styles.img}>
                <Image src={confirmImg} alt="Your email confirmed" width={432} height={300} />
            </div>
        </div>
    );
};
