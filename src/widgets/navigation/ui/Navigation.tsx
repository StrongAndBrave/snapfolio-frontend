'use client';
import styles from './Navigation.module.scss';
import { ImgBtn } from '@/shared/ui/img-btn/ImgBtn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogoutMutation } from '@/features/auth/api/authApi';

import SvgHome from '../../../../public/svg/home.svg';
import SvgPlusSquare from '../../../../public/svg/plus-square.svg';
import SvgPerson from '../../../../public/svg/person.svg';
import SvgMessage from '../../../../public/svg/message.svg';
import SvgSearch from '../../../../public/svg/search.svg';
import SvgTrendingUp from '../../../../public/svg/trending-up.svg';
import SvgBookMark from '../../../../public/svg/bookmark.svg';
import SvgLogOut from '../../../../public/svg/log-out.svg';

import { CreatePost } from '@/features/posts/ui/create-post/CreatePost';
import { useState } from 'react';
import { CreatePostExitModal } from '@/features/posts/ui/create-post/exit-modal/ExitModal';

const menuItems = [
    { icon: <SvgHome className={styles.icon} />, title: 'Home', href: '/' },
    { icon: <SvgPlusSquare className={styles.icon} />, title: 'Create' },
    { icon: <SvgPerson className={styles.icon} />, title: 'My Profile', href: '/profile' },
    { icon: <SvgMessage className={styles.icon} />, title: 'Messenger', href: '/messenger' },
    { icon: <SvgSearch className={styles.icon} />, title: 'Search', href: '/search' },
    { icon: <SvgTrendingUp className={styles.icon} />, title: 'Statistics', href: '/statistics' },
    { icon: <SvgBookMark className={styles.icon} />, title: 'Favorites', href: '/favorites' },
];

export const Navigation = () => {
    const pathname = usePathname();

    const [logout] = useLogoutMutation();

    const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);
    const [openExitModal, setOpenExitModal] = useState<boolean>(false);

    const handleClearCreatePost = () => {
        setOpenExitModal(false);
        setOpenCreatePost(false);
    };

    const handleCreatePost = () => {
        setOpenCreatePost(true);
    };

    const handleCloseCreatPost = (variant?: boolean) => {
        if (variant) {
            handleClearCreatePost();
        } else {
            setOpenExitModal(true);
        }
    };

    // const handleLogout = async () => {
    //     try {
    //         await logout().unwrap();
    //     } catch (error) {
    //         console.error('Logout failed:', error);
    //     }
    // };

    return (
        <nav className={styles.sidebar}>
            <ul className={styles.menu}>
                {menuItems.map(({ icon, title, href }) => (
                    <li key={title} className={styles.linkItem}>
                        <ImgBtn
                            className={`${styles.link} ${pathname === href && styles.linkActive}`}
                            icon={icon}
                            as={href ? Link : 'button'}
                            {...(href ? { href } : { onClick: handleCreatePost })}
                        >
                            {title}
                        </ImgBtn>
                    </li>
                ))}
            </ul>
            <div className={styles.logout}>
                <ImgBtn className={styles.link} icon={<SvgLogOut className={styles.icon} />} onClick={() => logout()}>
                    Log Out
                </ImgBtn>
            </div>
            <CreatePost isOpen={openCreatePost} onClose={handleCloseCreatPost} />
            <CreatePostExitModal
                clearCreatePost={handleClearCreatePost}
                onClose={() => setOpenExitModal(false)}
                isOpen={openExitModal}
            />
        </nav>
    );
};
