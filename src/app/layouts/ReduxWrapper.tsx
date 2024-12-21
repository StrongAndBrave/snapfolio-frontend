'use client';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export const ReduxWrapper = ({ children }: Props) => <Provider store={store}>{children}</Provider>;
