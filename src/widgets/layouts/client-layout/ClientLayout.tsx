'use client';
import { Header } from '@/widgets/header';
import { PropsWithChildren } from 'react';
import styles from './ClientLayout.module.scss';
import { Provider } from 'react-redux';
import { store } from '@/shared/store';

export const ClientLayout = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <Provider store={store}>
            <div className={styles.layout}>
                <Header />
                <main className={styles.main}>{children}</main>
                <div id="modal-root"></div>
                <div id="modal"></div>
            </div>
        </Provider>
    );
};
