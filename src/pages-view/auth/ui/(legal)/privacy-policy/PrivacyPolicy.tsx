import { PrivacyContent } from './const';
import parse from 'html-react-parser';
import styles from '../legal.module.scss';
import Link from 'next/link';
import SvgArrowBack from '../../../../../../public/svg/arrow-back.svg';
import { ImgBtn } from '@/shared/ui/img-btn/ImgBtn';
import React from 'react';

export const PrivacyPolicy = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <ImgBtn className={styles.back} icon={<SvgArrowBack />} as={Link} href={'/auth/sign-up'}>
                    Back to Sign Up
                </ImgBtn>
                <h1 className={styles.title}>{PrivacyContent.title}</h1>
            </div>
            <p className={styles.text}>{parse(PrivacyContent.content)}</p>
        </div>
    );
};
