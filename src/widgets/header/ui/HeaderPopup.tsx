import { ButtonUI } from '@/shared/ui';
import styles from './HeaderWidget.module.scss';
import Link from 'next/link';
import signInSVG from '../../../../public/svg/arrow-forward.svg';
import signUpSVG from '../../../../public/svg/person-add.svg';
import settingsSVG from '../../../../public/svg/settings.svg';
import statisticsSVG from '../../../../public/svg/statisctics.svg';
import favoritesSVG from '../../../../public/svg/bookmark.svg';

// type Props = {
//     isVisible: boolean;
//     onClick: () => void;
// }

export const HeaderPopup = () => {
    const isAuthorized = true; // получить актуальные данные
    return isAuthorized ? (
        <ul className={styles.menu}>
            <li>
                <ButtonUI as={Link} href="#" src={settingsSVG} alt={'settings'}>
                    Profile Settings
                </ButtonUI>
            </li>
            <li>
                <ButtonUI as={Link} href="#" src={statisticsSVG} alt={'statistics'}>
                    Statistics
                </ButtonUI>
            </li>
            <li>
                <ButtonUI as={Link} href="#" src={favoritesSVG} alt={'favorites'}>
                    Favorites
                </ButtonUI>
            </li>
            <li>
                <ButtonUI src={signInSVG} alt={'favorites'}>
                    Log Out
                </ButtonUI>
            </li>
        </ul>
    ) : (
        <ul className={styles.menu}>
            <li>
                <ButtonUI as={Link} href="/sign-in" src={signInSVG} alt={'log in'}>
                    Log In
                </ButtonUI>
            </li>
            <li>
                <ButtonUI as={Link} href="/sign-up" src={signUpSVG} alt={'sign up'}>
                    Sign Up
                </ButtonUI>
            </li>
        </ul>
    );
};
