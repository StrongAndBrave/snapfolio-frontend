'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';

type Props = {
    children: React.ReactNode;
};

export const ReduxWrapper = ({ children }: Props) => {
    return (
        <>
            <Provider store={store}>{children}</Provider>
        </>
    );
};
