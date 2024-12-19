'use client';
import styles from './SocialAuth.module.scss';
import { useLazyGithubAuthQuery } from '@/features/auth/api/authApi';
import { ImgBtn } from '@/shared/ui/img-btn/ImgBtn';
import SvgGithub from '../../../../../public/svg/github.svg';
import SvgGoogle from '../../../../../public/svg/google.svg';

export const SocialAuth = () => {
    const [trigger] = useLazyGithubAuthQuery();

    return (
        <div className={styles.authButtons}>
            <ImgBtn className={styles.authButton} icon={<SvgGoogle />} />
            <ImgBtn className={styles.authButton} icon={<SvgGithub />} onClick={() => trigger()} />
        </div>
    );
};
