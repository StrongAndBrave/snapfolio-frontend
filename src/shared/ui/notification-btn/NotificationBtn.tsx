import svgBell from '../../../../public/svg/bell.svg';
import Image from 'next/image';
import styles from './NotificationBtn.module.scss';

export const NotificationBtn = () => {
    const notificationCount = 3; /* число будем получать c сервера */
    return (
        <div className={styles.wrapper}>
            <button className={styles.btn}>
                <Image src={svgBell} alt={'Notifications'} className={styles.img} />
            </button>
            {notificationCount > 0 && (
                <div className={styles.count}>
                    <span className={styles.number}>{notificationCount}</span>
                </div>
            )}
        </div>
    );
};
