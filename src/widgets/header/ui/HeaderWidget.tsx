import { Logo } from '@/shared/ui';
import styles from './HeaderWidget.module.scss';
import { HeaderMenu } from './HeaderMenu';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <HeaderMenu />
            </div>
        </header>
    );
};
