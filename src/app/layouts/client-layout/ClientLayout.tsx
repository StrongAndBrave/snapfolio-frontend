'use client';
import { Header } from '@/widgets/header';
import { PropsWithChildren, useEffect, useState } from 'react';
import styles from './ClientLayout.module.scss';
import { useMeQuery } from '@/features/auth/api/authApi';
import { Navigation } from '@/widgets/navigation';
import { useAppSelector } from '@/app/store/store';
import { selectIsAuthorized } from '@/features/auth/model/authSlice';
import { Loader } from '@/shared/ui/loader/Loader';

export const ClientLayout = ({ children }: PropsWithChildren<unknown>) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const isAuthorized = useAppSelector(selectIsAuthorized);
    const { isLoading } = useMeQuery();

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true);
        }
    }, [isLoading]);

    return (
        <div className={styles.layout}>
            {isInitialized && (
                <>
                    <Header />
                    <div className={styles.wrapper}>
                        {isAuthorized && <Navigation />}
                        <main className={`${styles.main} ${isAuthorized ? styles.spacer : styles.public}`}>
                            {children}
                        </main>
                    </div>
                    <div id='modal-root'></div>
                    <div id='modal-action'></div>
                </>
            )}

            {!isInitialized && <Loader />}
        </div>
    );
};
