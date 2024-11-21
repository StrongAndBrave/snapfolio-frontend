import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Password } from '../password/Password';
import { Search } from '../search/Search';

const meta: Meta<typeof Input> = {
    title: 'components/Input',
    component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Input type={'text'} label="Default" />
            <Input type={'text'} error="Заполните поле" label="Default" />
            <Input type={'text'} disabled label="Default" />
        </div>
    ),
};

export const Email: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Input type={'email'} label="Email" />
            <Input type={'email'} error="Заполните поле" label="Email" />
            <Input type={'email'} disabled label="Email" />
        </div>
    ),
};

export const Passwords: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <Password />
            <Password error="Обязательное поле" />
            <Password disabled />
        </div>
    ),
};

export const Searches: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <Search />
            <Search error="Заполните поле" />
            <Search disabled />
        </div>
    ),
};
