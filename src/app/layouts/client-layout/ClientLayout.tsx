'use client';
import { Header } from '@/widgets/header';
import {PropsWithChildren, useEffect, useState} from 'react';
import styles from './ClientLayout.module.scss';
import { Provider } from 'react-redux';
import {store} from "@/app/store/store";
import {useMeQuery} from "@/features/auth/api/authApi";

export const ClientLayout = ({ children }: PropsWithChildren<unknown>) => {

    const [isInitialized, setIsInitialized] = useState(false)
    const { isLoading } = useMeQuery()

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true)
        }
    }, [isLoading])

    return (
        <Provider store={store}>
            <div className={styles.layout}>
                {isInitialized && (
                    <>
                        <Header />
                        <main className={styles.main}>{children}</main>
                        <div id="modal-root"></div>
                    </>
                ) }

                {!isInitialized && (
                    <>
                        <div>идет загрузка...</div>
                    </>
                ) }
            </div>
        </Provider>
    );
};