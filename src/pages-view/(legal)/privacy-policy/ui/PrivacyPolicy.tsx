import { PrivacyContent } from './const';
import parse from 'html-react-parser';
import styles from './PrivacyPolicy.module.scss';
import { ButtonUI } from '@/shared/ui';
import Link from 'next/link';
import svgArrowBack from '../../../../../public/svg/arrow-back.svg';

export const PrivacyPolicy = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.back}>
                    <ButtonUI href={'/auth/sign-up'} as={Link} src={svgArrowBack} alt={'Back'} isNoMobileText>
                        Back to Sign Up
                    </ButtonUI>
                </div>
                <h1 className={styles.title}>{PrivacyContent.title}</h1>
            </div>
            <p className={styles.text}>{parse(PrivacyContent.content)}</p>
        </div>
    );
};
