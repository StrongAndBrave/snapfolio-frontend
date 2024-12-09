import React from 'react';
import styles from './RegistrationSuccess.module.scss';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import Image from 'next/image';
import imgSuccess from '../../../../public/succsess.png';

export const RegistrationSuccess = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.title}>Congratulations!</span>
            <p className={styles.text}>Your email has been confirmed</p>
            <Button className={styles.btn} as={Link} href={'/auth/sign-in'} variant={'contained'}>
                Sign In
            </Button>
            <Image className={styles.img} src={imgSuccess} alt="succsess img" />
        </div>
    );
};
